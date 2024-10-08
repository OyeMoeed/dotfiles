import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import { REGEX } from '@app/constants/app-validations';
import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import {
  DynamicField,
  FormValuesType,
} from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { KeyboardTypeOptions } from 'react-native';
import useParentLovChange from './useParentLovChange.hook';

const DYNAMIC_FIELDS_CONFIGS: { [key: string]: { regex?: RegExp; keyboardType: KeyboardTypeOptions } } = {
  [DYNAMIC_FIELDS_TYPES.TEXT]: {
    regex: /^[\s_a-z\u0621-\u064A@.\s0-9٠-٩]*$/i,
    keyboardType: 'default',
  },
  [DYNAMIC_FIELDS_TYPES.ALPHA_NO_DIGITS]: {
    regex: /^[\sa-z\u0621-\u064A]*$/i,
    keyboardType: 'default',
  },
  [DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS]: {
    regex: /^[\sa-z]*$/i,
    keyboardType: 'default',
  },
  [DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS_DIGITS]: {
    regex: /^[\sa-z0-9]*$/i,
    keyboardType: 'default',
  },
  [DYNAMIC_FIELDS_TYPES.NUMBER]: {
    regex: /^[\sa-z0-9]*$/i,
    keyboardType: 'numeric',
  },
};

const getInputRegexAndKeyboardType = (key: string): { regex?: RegExp; keyboardType: KeyboardTypeOptions } => {
  if (DYNAMIC_FIELDS_CONFIGS?.[key]) {
    return DYNAMIC_FIELDS_CONFIGS?.[key];
  }
  return {
    regex: undefined,
    keyboardType: 'default',
  };
};

const useDynamicForm = (fetchedFields: DynamicField[], shouldShowOptional?: boolean) => {
  const { t } = useTranslation();
  const [parsedFields, setParsedFields] = useState<DynamicField[]>([]);
  const handleParentLovChange = useParentLovChange(parsedFields, setParsedFields);

  const keyCleaner = (index?: string | null) => {
    if (index?.length) {
      return index?.replace(/\./g, '_');
    }
    return '';
  };
  // Memoized function to create default values
  const defaultValues = useMemo(() => {
    const defaultVals: Record<string, string | undefined> = {};
    fetchedFields?.forEach((field) => {
      const { index, value, defaultValue } = field;
      defaultVals[keyCleaner(index)] = value || defaultValue;
    });
    return defaultVals;
  }, [fetchedFields]);

  const checkListOfValueWithOption = useCallback(
    (fields: DynamicField[]): DynamicField[] => {
      let fieldsCopy: DynamicField[] = [...(fields || [])];
      const indexArray: number[] = [];
      fields?.forEach((element, index) => {
        if (element.type === DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE_WITH_OTHER_OPTION) {
          indexArray.push(index);
        }
      });

      indexArray?.forEach((index) => {
        const firstSlice = fieldsCopy.slice(0, index + 1);
        const secondSlice = fieldsCopy.slice(index + 1);

        firstSlice.push({
          index: `OtherField-${keyCleaner(fieldsCopy[index]?.index)}`,
          type: DYNAMIC_FIELDS_TYPES.TEXT,
          label: `${t('COMMON.OTHERS')} ${fieldsCopy[index]?.label}`,
          dependent_key: keyCleaner(fieldsCopy[index]?.index),
          dependent_value: 'other',
        });

        fieldsCopy = [...firstSlice, ...secondSlice];
      });

      return fieldsCopy;
    },
    [t],
  );

  const fieldsBuilder = useCallback(
    (): DynamicField[] =>
      checkListOfValueWithOption(fetchedFields)?.map((field) => {
        const data = field.lovList ?? field.allowedValues ?? null;
        if (
          field.type === DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE_WITH_OTHER_OPTION &&
          data?.findIndex((object: ListItem) => object?.code === 'other') === -1
        ) {
          data.push({ code: 'other', desc: t('COMMON.OTHERS') });
        }
        return {
          ...field,
          index: keyCleaner(field?.index),
          originalIndex: field?.index,
          parentIndex: keyCleaner(field?.parentIndex),
          originalParentIndex: field?.parentIndex,
          childIndex: keyCleaner(field?.childIndex),
          originalChildIndex: field?.childIndex,
          lovList: data,
          minimumDate:
            field.type === DYNAMIC_FIELDS_TYPES.HIJRI_DATE_FUTURE ||
            field.type === DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE_FUTURE
              ? new Date()
              : null,
          maximumDate:
            field.type === DYNAMIC_FIELDS_TYPES.HIJRI_DATE_PAST ||
            field.type === DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE_PAST
              ? new Date()
              : null,
          showOptional: !field?.required && shouldShowOptional,
          returnFullValue: field?.type === DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE_WITH_OTHER_OPTION,
          ...getInputRegexAndKeyboardType(field?.type),
        };
      }),
    [checkListOfValueWithOption, fetchedFields, shouldShowOptional, t],
  );

  // Function to revert the flat keys to their original structure
  const revertFlatKeys = (obj: Record<string, any>, separator: string = '_'): Record<string, any> => {
    const result: Record<string, any> = {};
    Object.keys(obj)?.forEach((flatKey) => {
      const originalKey = flatKey?.replace(new RegExp(separator, 'g'), '.');
      result[originalKey] = obj[flatKey];
    });
    return result;
  };

  const shouldAddMinMax = (type: string) =>
    [
      DYNAMIC_FIELDS_TYPES.NUMBER,
      DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS,
      DYNAMIC_FIELDS_TYPES.ALPHA_NO_DIGITS,
      DYNAMIC_FIELDS_TYPES.TEXT_ALTERNATIVE_LOV,
      DYNAMIC_FIELDS_TYPES.TEXT,
      DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS_DIGITS,
    ]
      .join(',')
      .includes(type);

  // Memoized function to generate validation schema
  const validationSchema = useMemo(() => {
    try {
      const shape: Record<string, Yup.Schema<any>> = {};
      parsedFields?.forEach((field) => {
        const { type, required, minWidth, maxWidth, label, index } = field;
        let schema;

        switch (type) {
          case DYNAMIC_FIELDS_TYPES.NUMBER:
            schema = Yup.string();
            if (required) {
              schema = schema.matches(REGEX.DIGITS_ONLY, t('VALIDATION.MUST_BE_NUMBER')?.replace('{label}', label));
            }
            break;
          case DYNAMIC_FIELDS_TYPES.BOOLEAN_TYPE:
            schema = Yup.boolean().typeError(t('VALIDATION.REQUIRED')?.replace('{label}', label));
            break;
          case DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS:
            schema = Yup.string()
              .typeError(t('VALIDATION.MUST_BE_TEXT')?.replace('{label}', label))
              .matches(REGEX.withoutSpecialCharactersOrArabicOrDigits, t('VALIDATION.ALPHA_NO_DIGITS'));

            break;
          case DYNAMIC_FIELDS_TYPES.ALPHA_NO_DIGITS:
            schema = Yup.string()
              .typeError(t('VALIDATION.MUST_BE_TEXT')?.replace('{label}', label))
              .matches(REGEX.withoutAllSpecialCharactersAndDigits, t('VALIDATION.ALPHA_NO_DIGITS'));

            break;
          case DYNAMIC_FIELDS_TYPES.ENUMERATION:
          case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE:
          case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE_WITH_OTHER_OPTION:
            if (!field?.returnFullValue) {
              schema = Yup.string().typeError(t('VALIDATION.MUST_BE_TEXT')?.replace('{label}', label));
            } else {
              schema = Yup.object().test(
                'checkValueIfOthers',
                t('VALIDATION.MUST_BE_TEXT')?.replace('{label}', label),
                (val: ListItem) => {
                  if (required) {
                    return !!val?.code;
                  }
                  return true;
                },
              );
            }
            break;
          case DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE:
          case DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE_PAST:
          case DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE_FUTURE:
          case DYNAMIC_FIELDS_TYPES.HIJRI_DATE:
          case DYNAMIC_FIELDS_TYPES.HIJRI_DATE_PAST:
          case DYNAMIC_FIELDS_TYPES.HIJRI_DATE_FUTURE:
          case DYNAMIC_FIELDS_TYPES.DATE:
            schema = Yup.string().typeError(t('VALIDATION.MUST_BE_TEXT')?.replace('{label}', label));
            break;
          case DYNAMIC_FIELDS_TYPES.TEXT_ALTERNATIVE_LOV:
            schema = Yup.string().typeError(t('VALIDATION.MUST_BE_TEXT')?.replace('{label}', label));
            break;
          case DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS_DIGITS:
            schema = Yup.string()
              .typeError(t('VALIDATION.MUST_BE_TEXT')?.replace('{label}', label))
              .matches(REGEX.withoutSpecialCharactersOrArabic, t('VALIDATION.ALPHA_NO_DIGITS'));
            break;
          case DYNAMIC_FIELDS_TYPES.TEXT:
          default:
            schema = Yup.string().typeError(t('VALIDATION.MUST_BE_TEXT')?.replace('{label}', label));

            if (field?.index?.startsWith('OtherField-')) {
              schema = schema.test('checkOtherValue', t('VALIDATION.REQUIRED')?.replace('{label}', label), function () {
                if (field?.dependent_key && this.parent?.[field?.dependent_key]?.code === 'other') {
                  return !!this?.parent?.[field?.index];
                }
                return true;
              });
            }
            break;
        }

        if (required) {
          schema = schema.required(t('VALIDATION.REQUIRED')?.replace('{label}', label));
        }

        if (minWidth !== undefined && minWidth !== null && shouldAddMinMax(type)) {
          schema = (schema as Yup.StringSchema).min(
            minWidth,
            t('VALIDATION.MIN_WIDTH')?.replace('{label}', label)?.replace('{min}', String(minWidth)),
          );
        }
        if (maxWidth !== undefined && maxWidth !== null && shouldAddMinMax(type)) {
          schema = (schema as Yup.StringSchema).max(
            maxWidth,
            t('VALIDATION.MAX_WIDTH')?.replace('{label}', label)?.replace('{min}', String(minWidth)),
          );
        }
        shape[keyCleaner(index)] = schema;
      });
      return Yup.object().shape(shape);
    } catch (error) {
      return Yup.object().shape({});
    }
  }, [parsedFields, t]);

  const getSubmittedValues = (fields: DynamicField[], values: FormValuesType) => {
    let returnedValues: Array<{ index: string; value: string }> = [];
    fields?.forEach((field: DynamicField, idx: number) => {
      if (field?.index?.startsWith('OtherField-')) {
        if (
          field?.dependent_key &&
          values?.[field?.dependent_key] &&
          values?.[field?.dependent_key]?.code === field?.dependent_value
        ) {
          returnedValues = [
            ...returnedValues,
            {
              index: fields?.[idx - 1]?.originalIndex as string,
              value: values?.[field?.index] as string,
            },
          ];
        }
      } else if (field?.returnFullValue && field?.originalIndex && values?.[field?.index]?.code) {
        returnedValues = [
          ...returnedValues,
          { index: field?.originalIndex, value: values?.[field?.index]?.code as string },
        ];
      } else if (field?.originalIndex && values?.[field?.index]) {
        returnedValues = [...returnedValues, { index: field?.originalIndex, value: values?.[field?.index] as string }];
      }
    });
    return returnedValues;
  };

  useEffect(() => {
    setParsedFields(fieldsBuilder());
  }, [fieldsBuilder]);

  return {
    defaultValues,
    validationSchema,
    revertFlatKeys,
    fieldsBuilder,
    getSubmittedValues,
    parsedFields,
    handleParentLovChange,
  };
};

export default useDynamicForm;

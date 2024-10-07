import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';

import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const useDynamicForm = (fetchedFields: DynamicField[]) => {
  const { t } = useTranslation();
  // Memoized function to create default values
  const defaultValues = useMemo(() => {
    const defaultVals: Record<string, string> = {};
    fetchedFields?.forEach((field) => {
      const { integrationTagName, value } = field;
      const flatKey = integrationTagName?.replace(/\./g, '_');
      defaultVals[flatKey] = value ?? '';
    });
    return defaultVals;
  }, [fetchedFields]);

  // Function to revert the flat keys to their original structure
  const revertFlatKeys = (obj: Record<string, any>, separator: string = '_'): Record<string, any> => {
    const result: Record<string, any> = {};
    Object.keys(obj)?.forEach((flatKey) => {
      const originalKey = flatKey?.replace(new RegExp(separator, 'g'), '.');
      result[originalKey] = obj[flatKey];
    });
    return result;
  };

  // Memoized function to generate validation schema
  const validationSchema = useMemo(() => {
    const shape: Record<string, Yup.Schema<any>> = {};
    fetchedFields?.forEach((field) => {
      const { type, required, minWidth, maxWidth, label, integrationTagName } = field;
      const flatKey = integrationTagName?.replace(/\./g, '_');
      let schema = Yup.string();

      if (required) {
        schema = schema.required(t('VALIDATION.REQUIRED')?.replace('{label}', label));
      }
      switch (type) {
        case DYNAMIC_FIELDS_TYPES.NUMBER:
          schema = Yup.string().typeError(t('VALIDATION.MUST_BE_NUMBER')?.replace('{label}', label));
          if (minWidth != null) {
            schema = schema.min(
              minWidth,
              t('VALIDATION.MIN_WIDTH')?.replace('{label}', label)?.replace('{min}', String(minWidth)),
            );
          }
          if (maxWidth != null) {
            schema = schema.max(
              maxWidth,
              t('VALIDATION.MAX_WIDTH')?.replace('{label}', label)?.replace('{max}', String(maxWidth)),
            );
          }

          break;

        case DYNAMIC_FIELDS_TYPES.TEXT:
          schema = Yup.string().typeError(t('VALIDATION.MUST_BE_TEXT')?.replace('{label}', label));
          if (minWidth != null) {
            schema = schema.min(
              minWidth,
              t('VALIDATION.MIN_WIDTH')?.replace('{label}', label)?.replace('{min}', String(minWidth)),
            );
          }
          if (maxWidth != null) {
            schema = schema.max(
              maxWidth,
              t('VALIDATION.MAX_WIDTH')?.replace('{label}', label)?.replace('{max}', String(maxWidth)),
            );
          }

          break;
        case DYNAMIC_FIELDS_TYPES.BOOLEAN_TYPE:
          if (required) {
            schema = Yup.boolean().oneOf([true], t('VALIDATION.REQUIRED')?.replace('{label}', label));
          }
          break;

        default:
          break;
      }

      shape[flatKey] = schema;
    });
    return Yup.object().shape(shape);
  }, [fetchedFields]);

  return {
    defaultValues,
    validationSchema,
    revertFlatKeys,
  };
};

export default useDynamicForm;

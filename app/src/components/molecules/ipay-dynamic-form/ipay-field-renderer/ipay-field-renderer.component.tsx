import { IPayCaption2Text, IPayDatePicker } from '@app/components/atoms';
import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import { DateFieldTypes } from '@app/utilities';
import get from 'lodash/get';
import React from 'react';
import { Controller } from 'react-hook-form';
import IPayAnimatedTextInput from '../../ipay-animated-input-text/ipay-animated-input-text.component';
import IPayCheckboxTitle from '../../ipay-checkbox-title/ipay-chekbox-title.component';
import DynamicFieldRendererProps from './ipay-field-renderer.interface';

const DYNAMIC_FIELDS_CONFIGS = {
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
const DynamicFieldRenderer: React.FC<DynamicFieldRendererProps> = ({
  field,
  control,
  myIdCheck,
  myIdValue,
  handleParentLovChange,
}) => {
  const renderField = () => {
    // Replace "." with "_" to flatten the name
    const flatKey = field.index.replace(/\./g, '_');
    // let errorMessage
    // Fetch the error message before the switch statement
    // eslint-disable-next-line no-underscore-dangle
    const errorMessage = get(control?._formState?.errors, `${flatKey}.message`, '');

    switch (field.type) {
      case DYNAMIC_FIELDS_TYPES.TEXT:
      case DYNAMIC_FIELDS_TYPES.ALPHA_NO_DIGITS:
      case DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS:
      case DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS_DIGITS:
      case DYNAMIC_FIELDS_TYPES.NUMBER:
        return (
          <Controller
            name={flatKey} // Use the flattened key
            control={control}
            defaultValue={field.value}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <IPayAnimatedTextInput
                label={field.label}
                value={myIdCheck ? myIdValue : value}
                maxLength={field.maxWidth}
                onChangeText={onChange}
                keyboardType={DYNAMIC_FIELDS_CONFIGS[field.type]?.keyboardType}
                isError={!!get(errors, flatKey)}
                editable={!myIdCheck}
                assistiveText={errorMessage as string}
                testID={`${flatKey}-text-input`}
              />
            )}
          />
        );
      case DYNAMIC_FIELDS_TYPES.LABEL:
        return (
          <Controller
            name={flatKey} // Use the flattened key
            control={control}
            defaultValue={field.value}
            render={({ field: { value } }) => <IPayCaption2Text regular text={value} />}
          />
        );

      case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE_WITH_OTHER_OPTION:
      case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE:
        return (
          <Controller
            name={flatKey}
            control={control}
            defaultValue={field.value}
            render={({ field: { value, onChange } }) => (
              <IPayDropdownSelect
                data={field.lovList}
                selectedValue={value}
                label={field.label}
                onSelectListItem={(selectedItem: string) => {
                  onChange(selectedItem);
                  if (handleParentLovChange) handleParentLovChange(field.index, selectedItem);
                }}
                isSearchable
                testID={`${flatKey}-dropdown`}
                labelKey="desc"
                valueKey="code"
                disabled={!field?.lovList ? true : field?.lovList?.length === 0}
                errorMessage={errorMessage as string}
              />
            )}
          />
        );
      case DYNAMIC_FIELDS_TYPES.DATE:
      case DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE:
      case DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE_PAST:
      case DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE_FUTURE:
      case DYNAMIC_FIELDS_TYPES.HIJRI_DATE:
      case DYNAMIC_FIELDS_TYPES.HIJRI_DATE_PAST:
      case DYNAMIC_FIELDS_TYPES.HIJRI_DATE_FUTURE:
        return (
          <Controller
            name={flatKey}
            control={control}
            defaultValue={field.value}
            render={({ field: { onChange, value }, formState: { errors } }) => {
              const maximumDate = field?.type.includes(DateFieldTypes.Past) ? new Date() : null;
              const minimumDate = field?.type.includes(DateFieldTypes.Future) ? new Date() : null;
              return (
                <IPayDatePicker
                  maximumDate={maximumDate}
                  minimumDate={minimumDate}
                  value={value}
                  isError={!!get(errors, flatKey)}
                  onDateChange={onChange}
                  assistiveText={errorMessage as string}
                />
              );
            }}
          />
        );

      case DYNAMIC_FIELDS_TYPES.BOOLEAN_TYPE:
        return (
          <Controller
            name={flatKey}
            control={control}
            defaultValue={field.value}
            render={({ field: { value, onChange } }) => (
              <IPayCheckboxTitle
                heading={field.label}
                isCheck={value}
                onPress={() => {
                  onChange(!value);
                }}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  return renderField();
};

export default DynamicFieldRenderer;

import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import get from 'lodash/get';
import React from 'react';
import { Controller } from 'react-hook-form';
import IPayAnimatedTextInput from '../../ipay-animated-input-text/ipay-animated-input-text.component';
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
const DynamicFieldRenderer: React.FC<DynamicFieldRendererProps> = ({ field, control, handleChange }) => {
  const renderField = () => {
    // Replace "." with "_" to flatten the name
    const flatKey = field.index.replace(/\./g, '_');
    // let errorMessage
    // Fetch the error message before the switch statement
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
            render={({ field: { onChange, value }, formState: { errors } }) => {
              return (
                <IPayAnimatedTextInput
                  label={field.label}
                  value={value}
                  maxLength={field.maxWidth}
                  onChangeText={onChange}
                  keyboardType={DYNAMIC_FIELDS_CONFIGS[field.type]?.keyboardType}
                  isError={!!get(errors, flatKey)}
                  editable
                  assistiveText={errorMessage as string}
                  testID={`${flatKey}-text-input`}
                />
              );
            }}
          />
        );

      case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE_WITH_OTHER_OPTION:
      case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE:
        return (
          <Controller
            name={flatKey}
            control={control}
            defaultValue={field.value}
            render={({ field: { value, onChange } }) => {
              return (
                <IPayDropdownSelect
                  data={field.lovList}
                  selectedValue={value}
                  label={field.label}
                  onSelectListItem={(selectedItem: string) => {
                    onChange(selectedItem);
                    if (handleChange) handleChange(field.dependsOn, selectedItem);
                  }}
                  isSearchable={true}
                  testID={`${flatKey}-dropdown`}
                  labelKey="desc"
                  valueKey="code"
                  disabled={field.disable}
                  errorMessage={errorMessage as string}
                />
              );
            }}
          />
        );

      default:
        return null;
    }
  };

  return renderField();
};

export default DynamicFieldRenderer;

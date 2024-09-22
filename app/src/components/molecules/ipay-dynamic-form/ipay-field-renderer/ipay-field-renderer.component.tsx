import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import get from 'lodash/get';
import React from 'react';
import { Controller } from 'react-hook-form';
import IPayAnimatedTextInput from '../../ipay-animated-input-text/ipay-animated-input-text.component';
import DynamicFieldRendererProps from './ipay-field-renderer.interface';

const DynamicFieldRenderer: React.FC<DynamicFieldRendererProps> = ({ field, control, handleChange }) => {
  const renderField = () => {
    // Replace "." with "_" to flatten the name
    const flatKey = field.index.replace(/\./g, '_');
    let errorMessage;
    switch (field.type) {
      case DYNAMIC_FIELDS_TYPES.TEXT:
      case DYNAMIC_FIELDS_TYPES.NUMBER:
        return (
          <Controller
            name={flatKey} // Use the flattened key
            control={control}
            defaultValue={field.value}
            render={({ field: { onChange, value }, formState: { errors } }) => {
              errorMessage = get(errors, `${flatKey}.message`, '');
              return (
                <IPayAnimatedTextInput
                  label={field.label}
                  value={value}
                  maxLength={field.maxWidth}
                  onChangeText={onChange}
                  keyboardType={field.type === DYNAMIC_FIELDS_TYPES.NUMBER ? 'number-pad' : 'default'}
                  isError={!!get(errors, flatKey)}
                  editable
                  assistiveText={errorMessage as string}
                  testID={`${flatKey}-text-input`}
                />
              );
            }}
          />
        );

      case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE:
        return (
          <Controller
            name={flatKey}
            control={control}
            defaultValue={field.value}
            render={({ field: { value, onChange }, formState: { errors } }) => {
              errorMessage = get(errors, `${flatKey}.message`, '');
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

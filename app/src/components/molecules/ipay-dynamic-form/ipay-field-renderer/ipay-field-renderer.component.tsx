import { IPayDropdown } from '@app/components/atoms';
import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import get from 'lodash/get';
import React from 'react';
import { Controller } from 'react-hook-form';
import IPayAnimatedTextInput from '../../ipay-animated-input-text/ipay-animated-input-text.component';
import DynamicFieldRendererProps from './ipay-field-renderer.interface';

const DynamicFieldRenderer: React.FC<DynamicFieldRendererProps> = ({ field, control }) => {
  const renderField = () => {
    // Replace "." with "_" to flatten the name
    const flatKey = field.index.replace(/\./g, '_');
    switch (field.type) {
      case DYNAMIC_FIELDS_TYPES.TEXT:
      case DYNAMIC_FIELDS_TYPES.NUMBER:
        return (
          <Controller
            name={flatKey} // Use the flattened key
            control={control}
            render={({ field: { onChange, value }, formState: { errors } }) => {
              const errorMessage = get(errors, `${flatKey}.message`, '');
              return (
                <IPayAnimatedTextInput
                  label={field.label}
                  value={value}
                  maxLength={field.maxWidth}
                  onChangeText={onChange}
                  keyboardType={field.type === DYNAMIC_FIELDS_TYPES.NUMBER ? 'number-pad' : 'default'}
                  isError={!!get(errors, flatKey)} // Use flattened key for errors
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
            render={({ field: { value, onChange } }) => (
              <IPayDropdown
                data={field.lovList?.map((item, index) => ({
                  id: index + 1,
                  title: item.desc,
                }))}
                value={value}
                label={field.label}
                name={flatKey}
                onSelectListItem={(selectedItem: string) => onChange(selectedItem)}
                isSearchable={false}
                testID={`${flatKey}-dropdown`}
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

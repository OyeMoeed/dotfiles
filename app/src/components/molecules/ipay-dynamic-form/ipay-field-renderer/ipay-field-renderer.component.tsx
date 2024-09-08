import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import get from 'lodash/get';
import React from 'react';
import { Controller } from 'react-hook-form';
import IPayAnimatedTextInput from '../../ipay-animated-input-text/ipay-animated-input-text.component';
import DynamicFieldRendererProps from './ipay-field-renderer.interface';

const DynamicFieldRenderer: React.FC<DynamicFieldRendererProps> = ({ field, control }) => {
  const renderField = () => {
    switch (field.type) {
      case DYNAMIC_FIELDS_TYPES.TEXT:
      case DYNAMIC_FIELDS_TYPES.NUMBER:
        return (
          <Controller
            name={field.index}
            control={control}
            render={({ field: { onChange, value }, formState: { errors } }) => {
              const errorMessage = get(errors, `${field.index}.message`, '');

              return (
                <IPayAnimatedTextInput
                  label={field.label}
                  value={value}
                  maxLength={field.maxWidth}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  keyboardType={field.type === DYNAMIC_FIELDS_TYPES.NUMBER ? 'number-pad' : 'default'}
                  isError={!!get(errors, field.index)}
                  editable
                  assistiveText={errorMessage as string}
                  testID={`${field.index}-text-input`}
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

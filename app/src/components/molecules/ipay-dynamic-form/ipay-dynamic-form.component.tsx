import { IPayView } from '@app/components/atoms';
import { TrafficViolationFields } from '@app/utilities';
import React from 'react';
import DynamicFormComponentProps from './ipay-dynamic-form.interface';
import DynamicFieldRenderer from './ipay-field-renderer/ipay-field-renderer.component';

const DynamicFormComponent: React.FC<DynamicFormComponentProps> = ({
  fields,
  control,
  errors,
  containerStyle,
  handleChange,
  myIdValue,
  myIdCheck,
  handleParentLovChange,
}) => {
  if (!fields.length) {
    return null;
  }
  return (
    <>
      {fields.map((field) => (
        <IPayView key={field.index} style={containerStyle}>
          <DynamicFieldRenderer
            key={field.index}
            field={field}
            control={control}
            errors={errors}
            handleChange={handleChange}
            myIdValue={myIdValue}
            myIdCheck={field?.label === TrafficViolationFields.VIOLATOR_ID && myIdCheck}
            handleParentLovChange={handleParentLovChange}
          />
        </IPayView>
      ))}
    </>
  );
};

export default DynamicFormComponent;

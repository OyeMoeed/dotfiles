import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { useMemo } from 'react';
import * as Yup from 'yup';

const useDynamicForm = (fetchedFields: DynamicField[]) => {
  const defaultValues = useMemo(() => {
    const defaultVals: Record<string, string> = {};
    fetchedFields.forEach((field) => {
      const { integrationTagName, value } = field;
      const flatKey = integrationTagName.replace(/\./g, '_');
      defaultVals[flatKey] = value ?? '';
    });
    return defaultVals;
  }, [fetchedFields]);

  const revertFlatKeys = (obj: Record<string, any>, separator: string = '_'): Record<string, any> => {
    const result: Record<string, any> = {};
    Object.keys(obj).forEach((flatKey) => {
      const originalKey = flatKey.replace(new RegExp(separator, 'g'), '.');
      result[originalKey] = obj[flatKey];
    });
    return result;
  };

  const validationSchema = useMemo(() => {
    const shape: Record<string, Yup.Schema<any>> = {};
    fetchedFields.forEach((field) => {
      const { type, required, minWidth, maxWidth, label, integrationTagName } = field;
      const flatKey = integrationTagName.replace(/\./g, '_');
      let schema = Yup.string();

      switch (type) {
        case DYNAMIC_FIELDS_TYPES.NUMBER:
          schema = Yup.string().typeError(`${label} must be a valid number`);
          if (minWidth != null) schema = schema.min(minWidth, `${label} must be at least ${minWidth}`);
          if (maxWidth != null) schema = schema.max(maxWidth, `${label} must be no more than ${maxWidth}`);
          if (required) schema = schema.required(`${label} is required`);
          break;
        case DYNAMIC_FIELDS_TYPES.TEXT:
          schema = Yup.string().typeError(`${label} must be valid text`);
          if (minWidth != null) schema = schema.min(minWidth, `${label} must be at least ${minWidth}`);
          if (maxWidth != null) schema = schema.max(maxWidth, `${label} must be no more than ${maxWidth}`);
          if (required) schema = schema.required(`${label} is required`);
          break;
        case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE:
          schema = Yup.string().typeError(`${label} must be selected`);
          if (required) schema = schema.required(`${label} is required`);
          break;
        default:
          if (required) schema = schema.required(`${label} is required`);
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

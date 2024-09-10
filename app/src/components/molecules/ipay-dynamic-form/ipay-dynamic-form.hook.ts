import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import {
  DynamicField,
  GetDynamicFieldsPayloadTypes,
} from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import getDynamicFieldsService from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.service';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const useDynamicForm = (billerId: string, serviceId: string, walletNumber: string) => {
  const [fields, setFields] = useState<DynamicField[]>([]);
  const [defaultValues, setDefaultValues] = useState<Record<string, string>>({});
  const [isLoading, setisLoading] = useState<undefined | boolean>(undefined);

  const createDefaultValues = (dynamicFields: DynamicField[]) => {
    const defaultVals: Record<string, string> = {};

    dynamicFields.forEach((field) => {
      const { integrationTagName, value } = field;
      // converts BeneficiaryId.OfficialId to BeneficiaryId_OfficialId to avoid nesting
      const flatKey = integrationTagName.replace(/\./g, '_');

      defaultVals[flatKey] = value ?? '';
    });

    return defaultVals;
  };

  useEffect(() => {
    const fetchFields = async () => {
      const payload: GetDynamicFieldsPayloadTypes = { walletNumber };
      setisLoading(true);
      const response = await getDynamicFieldsService(billerId, serviceId, walletNumber, payload);
      if (response) {
        const fetchedFields = response.response.dynamicFields;

        setFields(fetchedFields);

        setDefaultValues(createDefaultValues(fetchedFields));
        setisLoading(false);
      }
    };

    fetchFields();
  }, [billerId, serviceId, walletNumber]);

  function revertFlatKeys(obj: Record<string, any>, separator: string = '_'): Record<string, any> {
    const result: Record<string, any> = {};

    Object.keys(obj).forEach((flatKey) => {
      const originalKey = flatKey.replace(new RegExp(separator, 'g'), '.');
      result[originalKey] = obj[flatKey];
    });

    return result;
  }

  const generateYupSchema = (dynamicFields: DynamicField[]) => {
    const shape: Record<string, Yup.Schema<any>> = {};

    dynamicFields.forEach((field) => {
      const { type, required, minWidth, maxWidth, label, integrationTagName } = field;

      // Flatten the path by replacing "." with "_"
      const flatKey = integrationTagName.replace(/\./g, '_');

      let schema = Yup.string(); // Default schema is string

      switch (type) {
        case DYNAMIC_FIELDS_TYPES.NUMBER:
          schema = Yup.string().typeError(`${label} must be a valid number`);
          if (minWidth != null) {
            schema = schema.min(minWidth, `${label} must be at least ${minWidth}`);
          }
          if (maxWidth != null) {
            schema = schema.max(maxWidth, `${label} must be no more than ${maxWidth}`);
          }
          if (required) {
            schema = schema.required(`${label} is required`);
          }
          break;

        case DYNAMIC_FIELDS_TYPES.TEXT:
          schema = Yup.string().typeError(`${label} must be valid text`);
          if (minWidth != null) {
            schema = schema.min(minWidth, `${label} must be at least ${minWidth}`);
          }
          if (maxWidth != null) {
            schema = schema.max(maxWidth, `${label} must be no more than ${maxWidth}`);
          }
          if (required) {
            schema = schema.required(`${label} is required`);
          }
          break;

        case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE:
          schema = Yup.string().typeError(`${label} must be selected`);
          if (required) {
            schema = schema.required(`${label} is required`);
          }
          break;

        default:
          if (required) {
            schema = schema.required(`${label} is required`);
          }
          break;
      }

      // Use the flat key for the schema
      shape[flatKey] = schema;
    });

    return Yup.object().shape(shape);
  };

  const validationSchema = generateYupSchema(fields);

  return {
    fields,
    defaultValues,
    validationSchema,
    isLoading,
    revertFlatKeys,
  };
};

export default useDynamicForm;

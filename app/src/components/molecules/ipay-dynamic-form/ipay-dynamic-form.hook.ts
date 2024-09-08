import {
  DynamicField,
  GetDynamicFieldsPayloadTypes,
} from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import getDynamicFieldsService from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.service';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const useDynamicForm = (billerId: string, serviceId: string, walletNumber: string) => {
  const [fields, setFields] = useState<DynamicField[]>([]);
  const [defaultValues, setDefaultValues] = useState<Record<string, any>>({});
  const [isLoading, setisLoading] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    const fetchFields = async () => {
      const payload: GetDynamicFieldsPayloadTypes = { walletNumber };
      setisLoading(true);
      const response = await getDynamicFieldsService(billerId, serviceId, walletNumber, payload);
      if (response) {
        const fetchedFields = response.response.dynamicFields;
        setisLoading(true);
        setFields(fetchedFields);

        const initialValues: Record<string, any> = {};
        fetchedFields.forEach((field) => {
          initialValues[field.index] = field.value || '';
        });
        setDefaultValues(initialValues);
      }
    };

    fetchFields();
  }, [billerId, serviceId, walletNumber]);

  const generateYupSchema = (dynamicFields: DynamicField[]) => {
    const shape: Record<string, Yup.Schema<any>> = {};
    //Add Dynamic Shape building here ( in progress )

    return Yup.object().shape(shape);
  };

  const validationSchema = generateYupSchema(fields);

  return {
    fields,
    defaultValues,
    validationSchema,
    isLoading,
  };
};

export default useDynamicForm;

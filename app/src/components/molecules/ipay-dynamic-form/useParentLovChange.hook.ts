import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import getDynamicFieldLovList from '@app/network/services/bills-management/dynamic-fields/dynamic-lov-list/get-dynamic-fields-lov.service';
import React, { useCallback } from 'react';

const useParentLovChange = (
  fields: DynamicField[],
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>,
) => {
  const handleParentLovChange = useCallback(
    // eslint-disable-next-line consistent-return
    async (fieldIndex: string, selectedValue: string | ListItem): Promise<void> => {
      const returnedValue = typeof selectedValue === 'object' ? selectedValue?.code : selectedValue;
      setFields((prevFields) => prevFields.map((f) => (f.index === fieldIndex ? { ...f, value: returnedValue } : f)));

      const currentSelectedField = fields.find((f) => f.index === fieldIndex);

      if (currentSelectedField && currentSelectedField.childIndex && currentSelectedField.lOVType && returnedValue) {
        try {
          // Calling the service to get child LOVs based on the selected parent value
          const response = await getDynamicFieldLovList({
            lovType: currentSelectedField.lOVType,
            filter1: returnedValue,
          });

          if (response?.successfulResponse) {
            // Updating child LOV options in the fields
            setFields((prevFields) =>
              prevFields.map((f) =>
                f.index === currentSelectedField.childIndex
                  ? { ...f, lovList: response.response.lovList, disable: false }
                  : f,
              ),
            );
          }
          return undefined;
        } catch (error) {
          return undefined;
        }
      }
    },
    [fields, setFields],
  );

  return handleParentLovChange;
};

export default useParentLovChange;

import { useMemo } from 'react';
import {
  internationalTransferData,
  InternationalTransferDataLabels,
  InternationalTransferLocalizationKeysMapping,
  TransferDataItem,
  TransferInfoListedData,
} from './internationl-tranfer-confirmation.constant';

const useInternationalTransferData = () => {
  // Create a lookup object
  const lookup = useMemo(
    () =>
      Object.values(InternationalTransferDataLabels).reduce(
        (acc, value) => ({
          ...acc,
          [value]: value,
        }),
        {} as { [key in InternationalTransferDataLabels]: string },
      ),
    [],
  );

  const getDataByKey = (label: InternationalTransferDataLabels): TransferDataItem | undefined =>
    internationalTransferData.find((item) => item.label === label);

  // Create a reverse lookup map for InternationalTransferDataLabels
  const labelToEnumKey = Object.entries(InternationalTransferDataLabels).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [value]: key as keyof typeof InternationalTransferDataLabels,
    }),
    {} as { [label: string]: keyof typeof InternationalTransferDataLabels },
  );

  // Function to get localization key from label
  const getLocalizationKeyFromLabel = (label: string): string | undefined => {
    const enumKey = labelToEnumKey[label];
    if (enumKey) {
      return InternationalTransferLocalizationKeysMapping[enumKey];
    }
    return undefined;
  };

  // Get data for multiple fields
  const getTransactionListedData = (): TransferDataItem[] =>
    Object.values(TransferInfoListedData)
      .map((field) => {
        const label = lookup[field];
        return getDataByKey(label as InternationalTransferDataLabels);
      })
      .filter((item): item is TransferDataItem => item !== undefined);

  return useMemo(
    () => ({
      lookup,
      getDataByKey,
      getTransactionListedData,
      getLocalizationKeyFromLabel,
    }),
    [],
  );
};

export default useInternationalTransferData;

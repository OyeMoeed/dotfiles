import useLocalization from '@app/localization/hooks/localization.hook';

interface billPayDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}
//TODO wiill be replaced by API
const useBillPaymentConfirmation = () => {
  const localizationText = useLocalization();

  const billPayDetailes: billPayDetail[] = [ //TODO will be repleaced by API data
    {
      id: '2',
      label: localizationText.TRAFFIC_VIOLATION.AMOUNT,
      value: '1000',
    },
    {
      id: '3',
      label: localizationText.TRAFFIC_VIOLATION.SERVICE_PROVIDER,
      value: 'Traffic MOI',
    },
    {
      id: '4',
      label: localizationText.TRAFFIC_VIOLATION.SERVICE_TYPE,
      value: 'Traffic violation',
    },
    {
      id: '2',
      label: localizationText.TRAFFIC_VIOLATION.VIOLATOR_ID,
      value: '10061883685',
    },
    {
      id: '3',
      label: localizationText.TRAFFIC_VIOLATION.VIOLATION_NUMBER_FULL,
      value: '2432533475',
    },
    {
      id: '4',
      label: localizationText.TRAFFIC_VIOLATION.VIOLATION_DATE,
      value: '14/03/2024 - 15:30',
    },
  ];

  const extraDetails: billPayDetail[] = [
    {
      id: '2',
      label: localizationText.TRAFFIC_VIOLATION.AMOUNT,
      value: '1000',
    },
  ];

  const balanceData = {
    availableBalance: '52000',
    balance: '50000',
    calculatedBill: '300',
  };

  return {
    localizationText,
    billPayDetailes,
    balanceData,
    extraDetails,
  };
};

export default useBillPaymentConfirmation;

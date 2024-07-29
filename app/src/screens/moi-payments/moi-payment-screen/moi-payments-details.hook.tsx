import useLocalization from '@app/localization/hooks/localization.hook';

interface MoiPaymentDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}

// TODO wiill be replaced by API
const useMoiPayment = () => {
  const localizationText = useLocalization();

  const moiPaymentDetailes: MoiPaymentDetail[] = [
    {
      id: '1',
      label: localizationText.BILL_PAYMENTS.DUE_AMOUNT,
      value: '500 SAR',
    },
    {
      id: '2',
      label: localizationText.BILL_PAYMENTS.SERVICE_PROVIDER,
      value: 'Expatriate Services',
    },
    {
      id: '3',
      label: localizationText.BILL_PAYMENTS.SERVICE_TYPE,
      value: 'Renewal of residence',
    },
    {
      id: '4',
      label: localizationText.BILL_PAYMENTS.BENEFICIARY_ID,
      value: '1965873233',
    },
    {
      id: '5',
      label: localizationText.BILL_PAYMENTS.LICENSE_TYPE,
      value: 'Expatriate Services',
    },
    {
      id: '6',
      label: localizationText.BILL_PAYMENTS.DURATION,
      value: 'Two years',
    },
  ];

  return {
    localizationText,
    moiPaymentDetailes,
  };
};

export default useMoiPayment;

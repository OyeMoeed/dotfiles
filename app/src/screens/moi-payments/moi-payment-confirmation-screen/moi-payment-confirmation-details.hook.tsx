import icons from '@app/assets/icons';
import useLocalization from '@app/localization/hooks/localization.hook';

interface MoiPaymentDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}

// TODO wiill be replaced by API
const useMoiPaymentConfirmation = () => {
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

  const moiPayBillSubList: MoiPaymentDetail[] = [
    {
      id: '1',
      label: localizationText.BILL_PAYMENTS.BILL_TYPE,
      value: 'Traffic Violation',
    },
    {
      id: '2',
      label: localizationText.BILL_PAYMENTS.TRAFFIC_NUMBER,
      value: '1965873233',
    },
    {
      id: '5',
      label: localizationText.TRAFFIC_VIOLATION.VIOLATION_DATE,
      value: '14/03/2023 - 15:30',
    },
    {
      id: '3',
      label: localizationText.BILL_PAYMENTS.DUE_AMOUNT,
      value: '500 SAR',
    },
    {
      id: '6',
      label: localizationText.COMMON.REF_NUM,
      value: 'FAT35346',
      icon: icons.copy,
    },
  ];

  const moiRefundBillSubList: MoiPaymentDetail[] = [
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
      label: localizationText.BILL_PAYMENTS.VIOLATION_NUBMER,
      value: '1965873233',
    },
    {
      id: '5',
      label: localizationText.TRAFFIC_VIOLATION.VIOLATION_DATE,
      value: '14/03/2023 - 15:30',
    },
    {
      id: '6',
      label: localizationText.COMMON.REF_NUM,
      value: 'FAT35346',
      icon: icons.copy,
    },
  ];

  return {
    localizationText,
    moiPaymentDetailes,
    moiRefundBillSubList,
    moiPayBillSubList,
  };
};

export default useMoiPaymentConfirmation;

import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';

interface billPayDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}

interface HeaderData {
  title: string;
  companyDetails: string;
  companyImage: string;
}

const useBillPaymentConfirmation = () => {
  const localizationText = useLocalization();

  const billPayDetailes: billPayDetail[] = [
    {
      id: '2',
      label: localizationText.PAY_BILL.SERVICE_TYPE,
      value: 'Electricity Bill',
    },
    {
      id: '3',
      label: localizationText.PAY_BILL.ACCOUNT_NUMBER,
      value: 'AZ00876',
    },
    {
      id: '4',
      label: localizationText.COMMON.DUE_DATE,
      value: '14/03/2024',
    },
  ];

  const headerData: HeaderData = {
    //TODO wiill be replacred by API
    title: 'My Electricity Bill',
    companyDetails: '123 - Saudi electricity co.',
    companyImage: images.electricityBill,
  };

  const balanceData = {
    availableBalance: '52000',
    balance: '50000',
    calculatedBill: '300',
  };

  return {
    localizationText,
    billPayDetailes,
    headerData,
    balanceData,
  };
};

export default useBillPaymentConfirmation;

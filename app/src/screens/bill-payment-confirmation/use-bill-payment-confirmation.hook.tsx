import icons from '@app/assets/icons';
import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import billPaymentStyles from './bill-payment-confirmation.styles';

interface WalletPayDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  color?: string;
}

interface HeaderData {
  title: string;
  companyDetails: string;
  companyImage: string;
}

const useBillPaymentConfirmation = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = billPaymentStyles(colors);

  const walletPayDetailes: WalletPayDetail[] = [
    {
      id: '2',
      label: 'Service Type',
      value: 'Electricity Bill',
    },
    {
      id: '3',
      label: 'Account Number',
      value: 'AZ00876',
      icon: icons.copy,
      // onPress: handleClickOnCopy,
    },
    {
      id: '4',
      label: 'Due Date',
      value: '14/03/2024',
    },
  ];

  const headerData: HeaderData = {
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
    styles,
    localizationText,
    walletPayDetailes,
    headerData,
    balanceData,
  };
};

export default useBillPaymentConfirmation;

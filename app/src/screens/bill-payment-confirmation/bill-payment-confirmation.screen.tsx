import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';

import { useRoute } from '@react-navigation/native';
import billPaymentStyles from './bill-payment-confirmation.styles';

const BillPaymentConfirmationScreen: React.FC = () => {
  const { colors } = useTheme();

  const route = useRoute();

  const localizationText = useLocalization();

  const styles = billPaymentStyles(colors);

  return <></>;
};
export default BillPaymentConfirmationScreen;

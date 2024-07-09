import { IPaySuccess } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { useNavigation, useRoute } from '@react-navigation/native';

const VirtualCardSuccess = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const localizationText = useLocalization();



  return (
    <IPaySuccess
      title={localizationText.CARDS.ISSUE_CARD}
      subTitle={localizationText.CARDS.ADD_TO_APPLE_PAY}
      isAddAppleWallet
    />
  );
};

export default VirtualCardSuccess;

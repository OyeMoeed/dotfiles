
import { IPayCardSuccess } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';

const VirtualCardSuccessScreen = () => {
  const localizationText = useLocalization();

  return (
    <IPayCardSuccess
      title={localizationText.CARD_OPTIONS.ISSUE_CARD}
      subTitle={localizationText.CARD_OPTIONS.ADD_TO_APPLE_PAY}
      isAddAppleWallet
      goHomeText={localizationText.COMMON.HOME}
      handleHomePress={() => {
        navigate(ScreenNames.HOME);
      }}
      handleGoToCard={() => {
        navigate(ScreenNames.CARDS);
      }}
    />
  );
};

export default VirtualCardSuccessScreen;

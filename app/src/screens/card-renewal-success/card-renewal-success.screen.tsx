import { IPaySuccess } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';

const CardRenewalSuccessScreen = () => {
  const localizationText = useLocalization();

  return (
    <IPaySuccess
      title={localizationText.CARD_RENEWAL_SUCCESS.THE_CARD_HAS_BEEN}
      subTitle={localizationText.CARDS.ADD_TO_APPLE_PAY}
      isAddAppleWallet
      goHomeText={localizationText.COMMON.HOME}
      handleHomePress={() => {
        navigate(ScreenNames.HOME);
      }}
    />
  );
};

export default CardRenewalSuccessScreen;

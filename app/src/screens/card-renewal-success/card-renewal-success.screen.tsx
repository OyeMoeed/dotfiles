import { IPaySuccess } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';

const CardRenewalSuccessScreen = () => {
  const localizationText = useLocalization();

  return (
    <IPaySuccess
      title={localizationText.CARD_RENEWAL_SUCCESS.THE_CARD_HAS_BEEN}
      subTitle={localizationText.CARDS.ADD_TO_APPLE_PAY}
      isAddAppleWallet
    />
  );
};

export default CardRenewalSuccessScreen;

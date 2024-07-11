import { IPaySuccess } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';

const VirtualCardSuccessScreen = () => {
  const localizationText = useLocalization();

  return (
    <IPaySuccess
      title={localizationText.CARD_OPTIONS.ISSUE_CARD}
      subTitle={localizationText.CARD_OPTIONS.ADD_TO_APPLE_PAY}
      isAddAppleWallet
    />
  );
};

export default VirtualCardSuccessScreen;

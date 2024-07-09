import { IPaySuccess } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';

const VirtualCardSuccess = () => {
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

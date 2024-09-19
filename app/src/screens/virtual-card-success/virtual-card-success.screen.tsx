import { IPayCardSuccess } from '@app/components/molecules';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { isIosOS } from '@app/utilities/constants';
import { useTranslation } from 'react-i18next';

const VirtualCardSuccessScreen = () => {
  const { t } = useTranslation();

  return (
    <IPayCardSuccess
      title="CARD_OPTIONS.ISSUE_CARD"
      subTitle={isIosOS ? t('CARD_OPTIONS.ADD_TO_APPLE_PAY') : ''}
      isAddAppleWallet={isIosOS}
      goHomeText="COMMON.HOME"
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

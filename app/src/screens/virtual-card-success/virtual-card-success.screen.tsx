import { IPayCardSuccess } from '@app/components/molecules';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { queryClient } from '@app/network';
import TRANSACTION_QUERY_KEYS from '@app/network/services/core/transaction/transaction.query-keys';
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
        queryClient.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEYS.GET_CARDS] });
        navigate(ScreenNames.HOME);
      }}
      handleGoToCard={() => {
        queryClient.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEYS.GET_CARDS] });
        navigate(ScreenNames.CARDS);
      }}
    />
  );
};

export default VirtualCardSuccessScreen;

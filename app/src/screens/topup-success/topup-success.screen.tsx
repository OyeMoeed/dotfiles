import IPayTopupSuccess from '@app/components/organism/ipay-topuup-successful/ipay-topup-successful.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { PayChannel } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/native';

const TopUpSuccessScreen = () => {
  const route: any = useRoute();
  const { topupChannel, topupStatus, isUnderProccess, summaryData, amount, requestPaidSummaryData } = route.params || {
    topupChannel: null,
    topupStatus: null,
  };

  const handleNavigation = (navigateTo: string) => {
    if (topupChannel === PayChannel.WALLET) {
      navigate(screenNames.WALLET_TRANSFER);
    } else if (topupChannel === PayChannel.GIFT) {
      navigate(screenNames.SEND_GIFT);
    } else if (topupChannel === PayChannel.MONEY) {
      navigate(screenNames.WALLET_TRANSFER);
    } else if (topupChannel === PayChannel.REQUEST) {
      navigate(screenNames.REQUEST_MONEY);
    } else if (topupChannel === PayChannel.ORDER) {
      navigate(ScreenNames.MARKETPLACE);
    } else {
      navigate(screenNames.TOP_UP, { variant: topupChannel });
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayTopupSuccess
        completionStatus={topupStatus}
        topupChannel={topupChannel}
        isUnderProccess={isUnderProccess}
        summaryData={summaryData}
        goBack={handleNavigation}
        amount={amount}
        requestPaidSummaryData={requestPaidSummaryData}
      />
    </IPaySafeAreaView>
  );
};

export default TopUpSuccessScreen;

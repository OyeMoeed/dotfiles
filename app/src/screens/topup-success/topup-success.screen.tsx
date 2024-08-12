import IPayTopupSuccess from '@app/components/organism/ipay-topuup-successful/ipay-topup-successful.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { payChannel } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/native';

const TopUpSuccessScreen = () => {
  const route = useRoute();
  const { topupChannel, topupStatus } = route.params || { topupChannel: null, topupStatus: null };

  const handleNavigation = (navigateTo: string) => {
    if (topupChannel === payChannel.WALLET) {
      navigate(screenNames.WALLET_TRANSFER);
    } else if (topupChannel === payChannel.GIFT) {
      navigate(screenNames.SEND_GIFT);
    } else if (topupChannel === payChannel.MONEY) {
      navigate(screenNames.WALLET_TRANSFER);
    } else if (topupChannel === payChannel.REQUEST) {
      navigate(screenNames.REQUEST_MONEY);
    } else {
      navigate(screenNames.TOP_UP, { variant: topupChannel });
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayTopupSuccess completionStatus={topupStatus} topupChannel={topupChannel} goBack={handleNavigation} />
    </IPaySafeAreaView>
  );
};

export default TopUpSuccessScreen;

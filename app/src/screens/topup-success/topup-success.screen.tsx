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
    } else {
      // Use navigateTo as the condition to determine navigation
      if (navigateTo === screenNames.WALLET_TRANSFER) {
        navigate(screenNames.WALLET_TRANSFER);
      } else {
        // Default navigation when navigateTo is not specifically handled
        navigate(screenNames.TOP_UP, { variant: topupChannel });
      }
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayTopupSuccess completionStatus={topupStatus} topupChannel={topupChannel} goBack={handleNavigation} />
    </IPaySafeAreaView>
  );
};

export default TopUpSuccessScreen;

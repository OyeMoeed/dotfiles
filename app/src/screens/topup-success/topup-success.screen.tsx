import IPayTopupSuccess from '@app/components/organism/ipay-topuup-successful/ipay-topup-successful.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { useRoute } from '@react-navigation/native';

const TopUpSuccessScreen = () => {

  const route = useRoute();
  const { topupChannel, topupStatus } = route.params || { topupChannel: null, topupStatus: null };

  const handleNavigation = (navigateTo: string) => {
    if (navigateTo) {
      navigate(screenNames.TOP_UP, { variant: topupChannel });
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayTopupSuccess
        completionStatus={topupStatus}
        topupChannel={topupChannel}
        goBack={handleNavigation}
      />
    </IPaySafeAreaView>
  );
};

export default TopUpSuccessScreen;



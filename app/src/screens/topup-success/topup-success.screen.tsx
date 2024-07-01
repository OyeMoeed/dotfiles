import IPayTopupSuccess from '@app/components/organism/ipay-topuup-successful/ipay-topup-successful.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { payChannel } from '@app/utilities/enums.util';
import { useNavigation, useRoute } from '@react-navigation/native';

const TopUpSuccess = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  // Safely access route parameters with defaults
  const { topupChannel, topupStatus } = route.params || { topupChannel: null, topupStatus: null };

  // Function to handle navigation with safety check
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

export default TopUpSuccess;



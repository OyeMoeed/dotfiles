import { IPaySafeAreaView } from '@app/components/templates';
import screenNames from '@app/navigation/screen-names.navigation';
import ResetSuccessful from '@app/screens/auth/reset-success/reset-success.screen';
import CardVerification from '@app/screens/cardVerification/cardVerification.screen';
import DelinkSuccess from '@app/screens/delink/delink-success';
import IdentitySuccessMessage from '@app/screens/identity-success-message/identity-success-message.screen';
import TopUp from '@app/screens/Topup/topup.screen';
// import Profile from '@app/screens/profile/profile.screen';
import { setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import HelpCenter from '@app/screens/help-center/helpcenter.screen';
import PointsRedemptionConfirmation from '@app/screens/points-redemptions-confirmation/points-redemptions-confirmation.screen';
import PointsRedemptionsScreen from '@app/screens/points-redemptions/points-redemptions.screen';
import Profile from '@app/screens/profile/profile.screen';
import Settings from '@app/screens/settings/settings.screen';
import TopUpIBAN from '@app/screens/topup-iban/topup-iban.screen';
import TopUpRedemptionSuccess from '@app/screens/topup-redemption-success/topup-redemption-success.screen';
import TopUpSuccess from '@app/screens/topup-success/topup-success.screen';
import TransactionHistory from '@app/screens/transaction-history/transaction-history.screen';
import Wallet from '@app/screens/wallet/wallet.screen';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import TabNavigation from '../../tab-navigation';
import CardOptionsScreen from '@app/screens/card-options/card-options.screen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTopLevelNavigator(navigation);
  }, []);

  return (
    <IPaySafeAreaView>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name={screenNames.HOME_BASE} options={{ headerShown: false }} component={TabNavigation} />
        <MainStack.Group screenOptions={{ presentation: 'card', headerMode: 'float', animationTypeForReplace: 'push' }}>
          <MainStack.Screen name={screenNames.WALLET} component={Wallet} />
          <MainStack.Screen name={screenNames.TOP_UP} component={TopUp} />
          <MainStack.Screen name={screenNames.TOP_UP_SUCCESS} component={TopUpSuccess} />
          <MainStack.Screen name={screenNames.CARD_VERIFICATION} component={CardVerification} />
          <MainStack.Screen name={screenNames.PROFILE} component={Profile} />
          <MainStack.Screen name={screenNames.POINTS_REDEMPTIONS} component={PointsRedemptionsScreen} />
          <MainStack.Screen
            name={screenNames.POINTS_REDEMPTIONS_CONFIRMATION}
            component={PointsRedemptionConfirmation}
          />
          <MainStack.Screen
            name={screenNames.POINTS_REDEMPTIONS_SUCCESS_AND_FAILED}
            component={TopUpRedemptionSuccess}
          />

          <MainStack.Screen
            name={screenNames.RESET_SUCCESSFUL}
            options={{ headerShown: false }}
            component={ResetSuccessful}
          />
          <MainStack.Screen name={screenNames.SETTINGS} options={{ headerShown: false }} component={Settings} />
          <MainStack.Screen name={screenNames.IDENTITY_SUCCESSFUL} component={IdentitySuccessMessage} />
          <MainStack.Screen name={screenNames.TRANSACTIONS_HISTORY} component={TransactionHistory} />
          <MainStack.Screen name={screenNames.DELINK_SUCCESS} component={DelinkSuccess} />
          <MainStack.Screen name={screenNames.TOP_UP_IBAN} component={TopUpIBAN} />
          <MainStack.Screen name={screenNames.HELP_CENTER} component={HelpCenter} />
          <MainStack.Screen name={screenNames.CARD_OPTIONS} component={CardOptionsScreen} />
        </MainStack.Group>
      </MainStack.Navigator>
    </IPaySafeAreaView>
  );
};

export default MainStackNavigator;

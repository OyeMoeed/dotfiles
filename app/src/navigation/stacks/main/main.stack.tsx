import screenNames from '@app/navigation/screen-names.navigation';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from '../../tab-navigation';
// import ResetPasscode from '@app/screens/auth/reset-passcode/reset-passcode.screen';
// import NewPasscode from '@app/screens/auth/confirm-reset/new-passcode.screen';
// import ConfirmPasscode from '@app/screens/auth/confirm-passcode/confirm-passcode.screen';
// import ResetSuccessful from '@app/screens/auth/reset-success/reset-success.screen';
// import Settings from '@app/screens/settings/settings.screen';
import { IPaySafeAreaView } from '@app/components/templates';
import ResetSuccessful from '@app/screens/auth/reset-success/reset-success.screen';
import IdentitySuccessMessage from '@app/screens/identity-success-message/identity-success-message.screen';
import Profile from '@app/screens/profile/profile.screen';
import Settings from '@app/screens/settings/settings.screen';
import TransactionHistory from '@app/screens/transaction-history/transaction-history.screen';
import Wallet from '@app/screens/wallet/wallet.screen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => (
  <IPaySafeAreaView>
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={screenNames.HOME_BASE} options={{ headerShown: false }} component={TabNavigation} />
      {/* add your another screen here using -> Stack.Screen */}
      <MainStack.Group screenOptions={{ presentation: 'card', headerMode: 'float', animationTypeForReplace: 'push' }}>
        <MainStack.Screen name={screenNames.WALLET} component={Wallet} />

        <MainStack.Screen name={screenNames.PROFILE} component={Profile} />
        <MainStack.Screen
          name={screenNames.RESET_SUCCESSFUL}
          options={{ headerShown: false }}
          component={ResetSuccessful}
        />
        <MainStack.Screen name={screenNames.SETTINGS} options={{ headerShown: false }} component={Settings} />
        <MainStack.Screen name={screenNames.IDENTITY_SUCCESSFUL} component={IdentitySuccessMessage} />
        <MainStack.Screen name={screenNames.TRANSACTIONS_HISTORY} component={TransactionHistory} />
      </MainStack.Group>
    </MainStack.Navigator>
  </IPaySafeAreaView>
);

export default MainStackNavigator;

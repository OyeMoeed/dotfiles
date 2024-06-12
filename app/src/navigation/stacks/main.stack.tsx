import { screenNames } from '@app/navigation/screen-names.navigation';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from '../tab-navigation';
import Wallet from '@app/screens/wallet/wallet.screen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name={screenNames.HOME_BASE} options={{ headerShown: false }} component={TabNavigation} />
    <MainStack.Group screenOptions={{ presentation: 'card', headerMode: 'float', animationTypeForReplace: 'push' }}>
      <MainStack.Screen name={screenNames.WALLET} component={Wallet} />
    </MainStack.Group>
  </MainStack.Navigator>
);

export default MainStackNavigator;

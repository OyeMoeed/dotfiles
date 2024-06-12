import screenNames from '@app/navigation/screen-names.navigation';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from '../tab-navigation';

const MainStack = createStackNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name={screenNames.HOME_BASE} options={{ headerShown: false }} component={TabNavigation} />
  </MainStack.Navigator>
);

export default MainStackNavigator;

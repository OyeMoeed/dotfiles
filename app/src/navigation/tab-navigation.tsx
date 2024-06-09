import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayIcon, IPayImage } from '@app/components/atoms';
import IPayBottomTabs from '@app/components/organism/ipay-bottom-tabs/ipay-bottom-tabs.component';
import { screenNames } from '@app/navigation/screen-names.navigation';
import Cards from '@app/screens/Cards/cards.screen';
import More from '@app/screens/More/more.screen';
import Home from '@app/screens/home/home.screen';
import MarketPlace from '@app/screens/marketplace/marketplace.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { scale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      tabBar={(props) => <IPayBottomTabs {...props} />}
    >
      <Tab.Screen
        name={screenNames.HOME}
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => <IPayImage image={images.logo} tintColor={color} />,
        }}
      />
      <Tab.Screen
        name={screenNames.CARDS}
        component={Cards}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => <IPayImage image={images.card} tintColor={color} />,
        }}
      />
      <Tab.Screen
        name={screenNames.MARKETPLACE}
        component={MarketPlace}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => <IPayImage image={images.shpingCart} tintColor={color} />,
        }}
      />
      <Tab.Screen
        name={screenNames.MORE}
        component={More}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => <IPayIcon icon={icons.menu} size={scale(24)} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;

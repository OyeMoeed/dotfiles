import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayIcon, IPayImage } from '@app/components/atoms';
import IPayBottomTabs from '@app/components/organism/ipay-bottom-tabs/ipay-bottom-tabs.component';
import screenNames from '@app/navigation/screen-names.navigation';

import Cards from '@app/screens/cards/cards.screen';
import Home from '@app/screens/home/home.screen';
import MarketPlace from '@app/screens/marketplace/marketplace.screen';
import MenuScreen from '@app/screens/menu/menu.screen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { moderateScale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const TabNavigation = () => (
  <Tab.Navigator
    sceneContainerStyle={{ backgroundColor: 'transparent' }}
    tabBar={(props) => <IPayBottomTabs {...props} />}
  >
    <Tab.Screen
      name={screenNames.HOME}
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }: TabBarIconProps) => (
          <IPayImage style={{ width: moderateScale(24), height: moderateScale(24) }} image={images.logoTab} />
        ),
      }}
    />
    <Tab.Screen
      name={screenNames.CARDS}
      component={Cards}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, isFocused }: TabBarIconProps) => (
          <IPayIcon icon={isFocused ? icons.card_focused : icons.card} color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name={screenNames.MARKETPLACE}
      component={MarketPlace}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }: TabBarIconProps) => <IPayIcon icon={icons.shopping_cart} size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name={screenNames.MORE}
      component={MenuScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, isFocused }: TabBarIconProps) => (
          <IPayIcon icon={isFocused ? icons.menu_filled : icons.menu_new} size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigation;

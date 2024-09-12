// TODO: fix nested-components
/* eslint-disable react/no-unstable-nested-components */
import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { CardIcon, MenuIcon, ShoppingCartIcon } from '@app/assets/svgs';
import { IPayIcon, IPayImage } from '@app/components/atoms';
import IPayBottomTabs from '@app/components/organism/ipay-bottom-tabs/ipay-bottom-tabs.component';
import screenNames from '@app/navigation/screen-names.navigation';

import Cards from '@app/screens/cards/cards.screen';
import Home from '@app/screens/home/home.screen';
import MarketPlace from '@app/screens/marketplace/marketplace.screen';
import MenuScreen from '@app/screens/menu/menu.screen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import TabBarIconProps from './tab-navigation.interface';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { params } = useRoute();
  const backgroundTransparent = { backgroundColor: 'transparent' };

  return (
    <Tab.Navigator sceneContainerStyle={backgroundTransparent} tabBar={(props) => <IPayBottomTabs {...props} />}>
      <Tab.Screen
        name={screenNames.HOME}
        component={Home}
        initialParams={params}
        options={{
          headerShown: false,
          tabBarIcon: ({ isFocused }: TabBarIconProps) => (
            <IPayImage
              style={{ width: moderateScale(24), height: moderateScale(24) }}
              image={isFocused ? images.logoTab : images.logoTabDim}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.CARDS}
        component={Cards}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, isFocused }: TabBarIconProps) => {
            if (isFocused) return <IPayIcon icon={icons.card_focused} color={color} size={24} />;
            return <CardIcon color={color} style={{ width: moderateScale(24), height: moderateScale(24) }} />;
          },
        }}
      />
      <Tab.Screen
        name={screenNames.MARKETPLACE}
        component={MarketPlace}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, isFocused }: TabBarIconProps) => {
            if (isFocused) return <IPayIcon icon={icons.shopping_cart} size={24} color={color} />;
            return <ShoppingCartIcon color={color} style={{ width: moderateScale(24), height: moderateScale(24) }} />;
          },
        }}
      />
      <Tab.Screen
        name={screenNames.MORE}
        component={MenuScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, isFocused }: TabBarIconProps) => {
            if (isFocused)
              return <IPayIcon icon={isFocused ? icons.menu_filled : icons.menu_new} size={24} color={color} />;
            return <MenuIcon color={color} style={{ width: moderateScale(24), height: moderateScale(24) }} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

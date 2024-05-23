import { screenNames } from '@app/navigation/screen-names.navigation';
import Profile from '@app/screens/Profile/Profile.screen';
import Home from '@app/screens/home/home.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={screenNames.HOME}
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => <Icon name="home-outline" size={25} color={color} />
        }}
      />
      <Tab.Screen
        name={screenNames.PROFILE}
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => <Icon name="finger-print-sharp" size={25} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;

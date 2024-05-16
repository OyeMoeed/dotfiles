import TabNavigation from '@app/navigation/tab-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTypedSelector } from '@store/store';
import { screenNames } from '@utilities/enums';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();

function MainNavigation() {
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localizationFlag);
  }, [localizationFlag]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screenNames.HOME_BASE} options={{ headerShown: false }} component={TabNavigation} />
        {/* add your another screen here using -> Stack.Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTypedSelector } from '@store/store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AuthStackNavigator from './stacks/auth.stack';
import MainStackNavigator from './stacks/main.stack';

const Stack = createStackNavigator();

function MainNavigation() {
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localizationFlag);
  }, [localizationFlag]);

  const isAuthenticated = true; // Replace with actual authentication logic

  return <NavigationContainer>{isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}</NavigationContainer>;
}

export default MainNavigation;

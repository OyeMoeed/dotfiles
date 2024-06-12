import { NavigationContainer } from '@react-navigation/native';
import { useTypedSelector } from '@store/store';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AuthStackNavigator from './stacks/auth.stack';
import MainStackNavigator from './stacks/main.stack';

const MainNavigation: React.FC = () => {
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localizationFlag);
  }, [localizationFlag]);

  const isAuthenticated = true; // Replace with actual authentication logic

  return <NavigationContainer>{isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}</NavigationContainer>;
};

export default MainNavigation;

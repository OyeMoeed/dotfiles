import { IPayLanguageSheet } from '@app/components/organism';
import { hideLanguageSheet } from '@app/store/slices/language-slice';
import { NavigationContainer } from '@react-navigation/native';
import { useTypedSelector } from '@store/store';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setTopLevelNavigator } from './navigation-service.navigation';
import AuthStackNavigator from './stacks/auth/auth.stack';
import MainStackNavigator from './stacks/main/main.stack';

const MainNavigation: React.FC = () => {
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);
  const isLanguageSheetVisible = useTypedSelector((state) => state.languageReducer.isLanguageSheetVisible);
  const { i18n } = useTranslation();
  const languageSheetRef = useRef<any>(); // Adjust type accordingly
  const navigationRef = useRef<any>(); // Adjust type accordingly
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(localizationFlag);
  }, [localizationFlag]);

  useEffect(() => {
    if (isLanguageSheetVisible && languageSheetRef.current) {
      languageSheetRef.current.present();
      dispatch(hideLanguageSheet());
    }
  }, [isLanguageSheetVisible]);

  useEffect(() => {
    setTopLevelNavigator(navigationRef.current);
  }, []);

  const { isAuthorized } = useTypedSelector((state) => state.auth);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        {isAuthorized ? <MainStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
      <IPayLanguageSheet ref={languageSheetRef} />
    </GestureHandlerRootView>
  );
};

export default MainNavigation;

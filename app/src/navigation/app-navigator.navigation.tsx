import { IPayBlurView } from '@app/components/molecules';
import { IPayLanguageSheet } from '@app/components/organism';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import PermissionTypes from '@app/enums/permissions-types.enum';
import useLocation from '@app/hooks/location.hook';
import { hideLanguageSheet } from '@app/store/slices/language-slice';
import screenNames from '@navigation/screen-names.navigation';
import AuthStackNavigator from '@navigation/stacks/auth/auth.stack';
import MainStackNavigator from '@navigation/stacks/main/main.stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTypedSelector } from '@store/store';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { resetNavigation, setTopLevelNavigator } from './navigation-service.navigation';

const MainNavigation: React.FC = () => {
  const { localizationFlag, appData } = useTypedSelector((state) => ({
    localizationFlag: state.localizationReducer.localizationFlag,
    appData: state.appDataReducer.appData,
  }));
  const isLanguageSheetVisible = useTypedSelector((state) => state.languageReducer.isLanguageSheetVisible);
  const { i18n } = useTranslation();
  const languageSheetRef = useRef<any>(); // Adjust type accordingly
  const navigationRef = useRef<any>(); // Adjust type accordingly
  const dispatch = useDispatch();

  const { permissionStatus, retryPermission } = useLocation(PermissionTypes.LOCATION, true);

  useEffect(() => {
    if (permissionStatus !== permissionsStatus.GRANTED) {
      retryPermission();
    }
  }, [permissionStatus, retryPermission]);

  useEffect(() => {
    if (isLanguageSheetVisible && languageSheetRef.current) {
      languageSheetRef.current.present();
      dispatch(hideLanguageSheet());
    }
  }, [isLanguageSheetVisible]);

  useEffect(() => {
    setTopLevelNavigator(navigationRef.current);
  }, []);

  const checkRedirection = () => {
    if (!appData?.isAuthenticated && appData?.isLinkedDevice && permissionStatus === permissionsStatus.GRANTED) {
      resetNavigation(screenNames.LOGIN_VIA_PASSCODE);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(localizationFlag);
    checkRedirection();
  }, [i18n, localizationFlag]);

  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef}>
        {appData?.isAuthenticated ? (
          <>
            <MainStackNavigator />
            <IPayBlurView />
          </>
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>
      <IPayLanguageSheet ref={languageSheetRef} />
    </GestureHandlerRootView>
  );
};

export default MainNavigation;

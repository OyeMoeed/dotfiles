import { IPayDropdownSheet } from '@app/components/atoms';
import { IPayBlurView } from '@app/components/molecules';
import IPayOfflineAlert from '@app/components/molecules/ipay-offline-alert/ipay-offline-alert.component';
import IPayPermissionAlert from '@app/components/molecules/ipay-permission-alert/ipay-permission-alert.component';
import IPaySessionTimeoutAlert from '@app/components/molecules/ipay-session-timeout-alert/ipay-session-timeout-alert.component';
import { IPayLanguageSheet } from '@app/components/organism';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import useLocation from '@app/hooks/location.hook';
import useInternetConnectivity from '@app/hooks/use-internet-connectivity.hook';
import { hideAlert, showAlert } from '@app/store/slices/alert-slice';
import { hideDropdownSheet } from '@app/store/slices/dropdown-slice';
import { hideLanguageSheet } from '@app/store/slices/language-slice';
import { hidePermissionAlert } from '@app/store/slices/permission-alert-slice';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
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
  const { selectedLanguage, appData, isAuthorized } = useTypedSelector((state) => ({
    selectedLanguage: state.languageReducer.selectedLanguage,
    appData: state.appDataReducer.appData,
    isAuthorized: state.auth.isAuthorized,
  }));
  const isAlertVisible = useTypedSelector((state) => state.alertReducer.visible);
  const isSessionTimeout = useTypedSelector((state) => state.alertReducer.sessionTimeout);
  const isLanguageSheetVisible = useTypedSelector((state) => state.languageReducer.isLanguageSheetVisible);
  const isDropdownVisible = useTypedSelector((state) => state.dropdownReducer.isDropdownVisible);
  const isPermissionVisible = useTypedSelector((state) => state.permissionAlertReducer.visible);
  const { i18n } = useTranslation();
  const languageSheetRef = useRef<any>();
  const navigationRef = useRef<any>();
  const dispatch = useDispatch();
  const dropdownRef = useRef<bottomSheetTypes>(null);
  const { permissionStatus, retryPermission } = useLocation();
  const isConnected = useInternetConnectivity();

  useEffect(() => {
    retryPermission();
  }, []);

  useEffect(() => {
    if (isLanguageSheetVisible && languageSheetRef.current) {
      languageSheetRef.current.present();
      dispatch(hideLanguageSheet());
    }
  }, [isLanguageSheetVisible]);

  useEffect(() => {
    if (isDropdownVisible && dropdownRef.current) {
      dropdownRef.current.present();
      dispatch(hideDropdownSheet());
    }
  }, [isDropdownVisible]);

  useEffect(() => {
    setTopLevelNavigator(navigationRef.current);
  }, []);

  const checkRedirection = () => {
    if (!appData?.isAuthenticated && appData?.isLinkedDevice && permissionStatus === permissionsStatus.GRANTED) {
      resetNavigation(screenNames.LOGIN_VIA_PASSCODE);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    checkRedirection();
  }, [i18n, selectedLanguage]);

  useEffect(() => {
    if (!isConnected) {
      dispatch(showAlert());
    } else {
      dispatch(hideAlert());
    }
  }, [isConnected, dispatch]);

  const handlePermissionAlert = () => {
    dispatch(hidePermissionAlert());
  };
  const handleCloseAlert = () => {
    dispatch(hideAlert());
  };
  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef}>
        {isAuthorized ? (
          <>
            <MainStackNavigator />
            <IPayBlurView />
          </>
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>

      <IPayLanguageSheet ref={languageSheetRef} />
      <IPayOfflineAlert visible={isAlertVisible} onClose={handleCloseAlert} />
      <IPayPermissionAlert visible={isPermissionVisible} onClose={handlePermissionAlert} />
      <IPaySessionTimeoutAlert visible={isSessionTimeout} />
      <IPayDropdownSheet ref={dropdownRef} />
    </GestureHandlerRootView>
  );
};

export default MainNavigation;

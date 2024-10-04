import { IPayDropdownSheet } from '@app/components/atoms';
import IPaySpinnerContainer from '@app/components/atoms/ipay-spinner/ipay-spinner.helper';
import { IPayBlurView } from '@app/components/molecules';
import IPayOfflineAlert from '@app/components/molecules/ipay-offline-alert/ipay-offline-alert.component';
import IPaySessionTimeoutAlert from '@app/components/molecules/ipay-session-timeout-alert/ipay-session-timeout-alert.component';
import { IPayLanguageSheet, IPayMaintentanceSheet } from '@app/components/organism';
import IPayServiceErrorToast from '@app/components/organism/ipay-service-error-toast/ipay-service-error-toast.component';
import IPayUpdateBottomSheet from '@app/components/organism/ipay-update-bottom-sheet/ipay-update-bottom-sheet.component';
import useInternetConnectivity from '@app/hooks/use-internet-connectivity.hook';
import { hideAlert, showAlert } from '@app/store/slices/alert-slice';
import { hideDropdownSheet } from '@app/store/slices/dropdown-slice';
import { hideLanguageSheet } from '@app/store/slices/language-slice';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import AuthStackNavigator from '@navigation/stacks/auth/auth.stack';
import MainStackNavigator from '@navigation/stacks/main/main.stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTypedSelector } from '@store/store';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setTopLevelNavigator } from './navigation-service.navigation';

const MainNavigation: React.FC = () => {
  const isAuthorized = useTypedSelector((state) => state.auth.isAuthorized);
  const selectedLanguage = useTypedSelector((state) => state.languageReducer.selectedLanguage);
  const isAlertVisible = useTypedSelector((state) => state.alertReducer.visible);
  const isSessionTimeout = useTypedSelector((state) => state.alertReducer.sessionTimeout);
  const isLanguageSheetVisible = useTypedSelector((state) => state.languageReducer.isLanguageSheetVisible);
  const isDropdownVisible = useTypedSelector((state) => state.dropdownReducer.isDropdownVisible);
  const { visible: isSpinnerVisible, spinnerProps } = useTypedSelector((state) => state.spinnerReducer);

  const { i18n } = useTranslation();

  const languageSheetRef = useRef<any>();
  const navigationRef = useRef<any>();
  const dispatch = useDispatch();
  const dropdownRef = useRef<bottomSheetTypes>(null);
  const isConnected = useInternetConnectivity();

  useEffect(() => {
    if (isLanguageSheetVisible && languageSheetRef.current) {
      languageSheetRef.current.present();
      dispatch(hideLanguageSheet());
    }
  }, [dispatch, isLanguageSheetVisible]);

  useEffect(() => {
    if (isDropdownVisible && dropdownRef.current) {
      dropdownRef.current.present();
      dispatch(hideDropdownSheet());
    }
  }, [dispatch, isDropdownVisible]);

  useEffect(() => {
    setTopLevelNavigator(navigationRef.current);
  }, []);

  useEffect(() => {
    const startUp = async () => {
      i18n.changeLanguage(selectedLanguage);
    };

    startUp();
  }, [i18n, selectedLanguage]);

  useEffect(() => {
    if (!isConnected) {
      dispatch(showAlert());
    } else {
      dispatch(hideAlert());
    }
  }, [isConnected, dispatch]);

  const handleCloseAlert = () => {
    dispatch(hideAlert());
  };
  return (
    <>
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
      <IPaySessionTimeoutAlert visible={isSessionTimeout} />
      <IPayDropdownSheet ref={dropdownRef} />
      <IPayServiceErrorToast testID={navigationRef?.current?.getCurrentRoute().name} />

      <IPaySpinnerContainer visible={isSpinnerVisible} spinnerProps={spinnerProps} />
      <IPayUpdateBottomSheet />
      <IPayMaintentanceSheet />
    </>
  );
};

export default MainNavigation;

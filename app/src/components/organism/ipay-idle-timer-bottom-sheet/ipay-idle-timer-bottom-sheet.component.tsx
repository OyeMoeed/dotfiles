import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import icons from '@app/assets/icons';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useGetWalletInfo from '@app/network/services/core/get-wallet/useGetWalletInfo';
import { IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { buttonVariants } from '@app/utilities';
import logOut from '@app/network/services/core/logout/logout.service';
import clearSession from '@app/network/utilities/network-session-helper';
import { hideIdleTimerBottomSheet } from '@app/store/slices/idle-timer-slice';

import IPayCommonAlertSheet from '../ipay-common-alert-sheet/ipay-common-alert-sheet.component';
import idleTimerStyles from './ipay-idle-timer-bottom-sheet.style';

const IPayIdleTimerBottomSheet = () => {
  const styles = idleTimerStyles();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useTypedDispatch();

  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);

  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);
  const isIdleTimerVisible = useTypedSelector((state) => state.idleTimerSlice.isSessionTimeout);
  const isAuthenticated = useTypedSelector((state) => state.appDataReducer.appData.isAuthenticated);
  const showIdleBottomSheet = isAuthenticated && isIdleTimerVisible;

  const [timeRemaining, setTimeRemaining] = useState(61);

  const { refetchWalletInfo } = useGetWalletInfo({
    payload: {
      walletNumber,
      hideError: true,
      hideSpinner: true,
    },
    useQueryProps: {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  });

  const hideBottomSheet = () => dispatch(hideIdleTimerBottomSheet());

  const onContinue = () => {
    hideBottomSheet();
    refetchWalletInfo();
  };

  const onLogout = async () => {
    hideBottomSheet();

    await logOut();
    clearSession(false);
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timerInterval: NodeJS.Timeout;

    if (showIdleBottomSheet) {
      timerInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timerInterval);
            onLogout();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      handlePresentModalPress();
    } else {
      handleClosePress();
    }

    return () => clearInterval(timerInterval);
  }, [handleClosePress, handlePresentModalPress, showIdleBottomSheet]);

  const renderButtons = () => (
    <IPayView style={styles.buttonContainer}>
      <IPayButton
        btnType={buttonVariants.OUTLINED}
        medium
        btnStyle={styles.button}
        btnIconsDisabled
        btnColor={colors.primary.primary500}
        btnText="MENU.LOGOUT"
        onPress={onLogout}
      />
      <IPayButton
        btnType={buttonVariants.PRIMARY}
        medium
        btnStyle={styles.button}
        btnIconsDisabled
        btnColor={colors.primary.primary500}
        btnText="COMMON.CONTINUE"
        onPress={onContinue}
      />
    </IPayView>
  );

  return (
    <IPayCommonAlertSheet
      ref={bottomSheetModalRef}
      headerTitle="IDLE_TIMER_SHEET.SHEET_TITLE"
      isForceAlert
      title={`${t('IDLE_TIMER_SHEET.TITLE')}:\n ${timeRemaining}`}
      subtitle="IDLE_TIMER_SHEET.DESCRIPTION"
      icon={icons.clock_1}
      iconColor={colors.warning.warning500}
      extraComponent={renderButtons()}
    />
  );
};

export default IPayIdleTimerBottomSheet;

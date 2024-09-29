import icons from '@app/assets/icons';
import { IPayIcon, IPayLinearGradientView, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader, IPayList } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import { SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, buttonVariants } from '@app/utilities';
import { useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { navigate } from '@app/navigation/navigation-service.navigation';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import billPaymentStyles from './traffic-violation-payment.styles';
import useBillPaymentConfirmation from './traffic-violation-payment.hook';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';

const TrafficViolationPaymentScreen: React.FC = () => {
  const {
    billPayDetailes,
    balanceData,
    handlePay,
    helpCenterRef,
    otpRef,
    handleOtpVerification,
    handleOnPressHelp,
    setOtp,
    isLoading,
    otpError,
    setOtpError,
    otp,
    otpVerificationRef,
  } = useBillPaymentConfirmation();
  const { otpConfig } = useConstantData();
  const { availableBalance, balance, calculatedBill } = balanceData;
  const { colors } = useTheme();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const styles = billPaymentStyles(colors);
  const route = useRoute();
  const variant = route?.params?.variant;

  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);

  const [chipValue, setChipValue] = useState('');

  const handleOTPVerify = () => {
    setOtpSheetVisible(true);
    handleOtpVerification();
    setOtpError(false);
  };
  const { monthlyRemainingOutgoingAmount } = walletInfo.limitsDetails;
  const monthlyRemaining = parseFloat(monthlyRemainingOutgoingAmount);

  const determineChipValue = useCallback(() => {
    if (balance === 0) {
      return 'REQUEST_SUMMARY.NO_REMAINING_AMOUNT';
    }
    if (parseFloat(calculatedBill) > availableBalance) {
      return 'REQUEST_SUMMARY.INSUFFICIENT_BALANCE';
    }
    return '';
  }, [monthlyRemaining]);

  const renderChip = useMemo(
    () =>
      chipValue && (
        <IPayChip
          textValue={determineChipValue()}
          variant={States.WARNING}
          isShowIcon
          containerStyle={styles.chipContainer}
          icon={
            <IPayIcon
              icon={chipValue === 'TOP_UP.LIMIT_REACHED' ? icons.warning : icons.shield_cross}
              color={colors.critical.critical800}
              size={16}
            />
          }
        />
      ),
    [chipValue, colors, icons], // Ensure all necessary dependencies are included
  );

  useEffect(() => {
    setChipValue(determineChipValue());
  }, [determineChipValue]);

  const [topUpOptionsVisible, setTopUpOptionsVisible] = useState<boolean>(false);

  const closeBottomSheetTopUp = () => {
    setTopUpOptionsVisible(false);
  };

  const topUpSelectionRef = React.createRef<any>();

  const navigateTOAktharPoints = async () => {
    const aktharPointsResponse = await getAktharPoints(walletInfo.walletNumber);
    if (
      aktharPointsResponse?.status?.type === 'SUCCESS' &&
      aktharPointsResponse?.response?.mazayaStatus !== 'USER_DOES_NOT_HAVE_MAZAYA_ACCOUNT'
    ) {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { aktharPointsInfo: aktharPointsResponse?.response, isEligible: true });
    } else {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { isEligible: false });
    }
  };

  const topupItemSelected = (routeName: string, params: {}) => {
    closeBottomSheetTopUp();
    if (routeName === ScreenNames.POINTS_REDEMPTIONS) {
      navigateTOAktharPoints();
    } else {
      navigate(routeName, params);
    }
  };

  const topUpSelectionBottomSheet = () => {
    // dispatch(setProfileSheetVisibility(false));
    setTopUpOptionsVisible(true);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title="TRAFFIC_VIOLATION.TITLE" backBtn applyFlex />
      <IPayView style={styles.innerContainer}>
        <IPayAccountBalance
          availableBalance={availableBalance ?? 0}
          showRemainingAmount
          balance={balance ?? 0}
          monthlyIncomingLimit={balance ?? 0}
          topUpBtnStyle={styles.topUpButton}
          onPressTopup={topUpSelectionBottomSheet}
        />
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <>
            <IPayBillDetailsOption showHeader={false} data={billPayDetailes} />
            {!variant && (
              <IPayBillDetailsOption showHeader={false} data={billPayDetailes} style={styles.listBottomView} />
            )}
          </>
        </IPayScrollView>
      </IPayView>
      <IPayLinearGradientView style={styles.gradientBg} gradientColors={colors.appGradient.buttonBackground}>
        {renderChip || (
          <IPayList
            title="TRANSACTION_HISTORY.TOTAL_AMOUNT"
            detailTextStyle={{ color: colors.primary.primary900 }}
            showDetail
            detailText={`${calculatedBill ?? 0} ${t('COMMON.SAR')}`}
          />
        )}

        <IPayButton
          btnType={buttonVariants.PRIMARY}
          // Disabled for now as QA is blocked to test this
          // disabled={chipValue}
          medium
          onPress={handleOTPVerify}
          btnText="COMMON.PAY"
          btnIconsDisabled
          btnStyle={styles.confirmButton}
        />
      </IPayLinearGradientView>
      <IPayPortalBottomSheet
        heading="PAY_BILL.HEADER"
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={() => setOtpSheetVisible(false)}
        isVisible={isOtpSheetVisible}
        ref={otpRef}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={handlePay}
          mobileNumber={walletInfo?.mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          isLoading={isLoading}
          otp={otp}
          showHelp
          timeout={otpConfig.login.otpTimeout}
          handleOnPressHelp={handleOnPressHelp}
          containerStyle={styles.otpContainerStyle}
          innerContainerStyle={styles.otpInnerContainer}
          toastContainerStyle={styles.toastContainerStyle}
          headingContainerStyle={styles.headingContainerStyle}
        />
      </IPayPortalBottomSheet>
      <IPayBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={SNAP_POINTS.LARGE}
        ref={helpCenterRef}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>

      <IPayPortalBottomSheet
        noGradient
        heading="TOP_UP.ADD_MONEY_USING"
        onCloseBottomSheet={closeBottomSheetTopUp}
        customSnapPoint={SNAP_POINT.XS_SMALL}
        ref={topUpSelectionRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
        isVisible={topUpOptionsVisible}
      >
        <IPayTopUpSelection
          testID="topUp-selection"
          closeBottomSheet={closeBottomSheetTopUp}
          topupItemSelected={topupItemSelected}
        />
      </IPayPortalBottomSheet>
    </IPaySafeAreaView>
  );
};

export default TrafficViolationPaymentScreen;

import { IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { useRoute } from '@react-navigation/core';
import React from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import useBillPaymentConfirmation from './traffic-violation-payment.hook';
import billPaymentStyles from './traffic-violation-payment.styles';

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
  const styles = billPaymentStyles();
  const route = useRoute();
  const variant = route?.params?.variant;

  const handleOTPVerify = () => {
    handleOtpVerification();
    setOtpError(false);
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
      <IPayView style={styles.footerContainer}>
        <SadadFooterComponent
          onPressBtn={handleOTPVerify}
          style={styles.margins}
          totalAmount={calculatedBill ?? 0}
          btnText="COMMON.PAY"
          disableBtnIcons
          btnStyle={styles.payBtn}
          backgroundGradient={colors.appGradient.buttonBackground}
        />
      </IPayView>
      <IPayPortalBottomSheet
        heading="PAY_BILL.HEADER"
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={() => otpRef?.current?.close()}
        isVisible
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
    </IPaySafeAreaView>
  );
};

export default TrafficViolationPaymentScreen;

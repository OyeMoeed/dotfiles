import { IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import useBillPaymentConfirmation from './traffic-violation-payment-refund.hook';
import billPaymentStyles from './traffic-violation-payment-refund.styles';

const TrafficViolationPaymentRefundScreen: React.FC = () => {
  const {
    localizationText,
    billPayDetailes,
    extraDetails,
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
    apiError,
    otpVerificationRef,
  } = useBillPaymentConfirmation();
  const { otpConfig } = useConstantData();
  const { availableBalance, balance, calculatedBill } = balanceData;
  const { colors } = useTheme();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const styles = billPaymentStyles();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.TRAFFIC_VIOLATION.TITLE} backBtn applyFlex />
      <IPayView style={styles.innerContainer}>
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <>
            <IPayBillDetailsOption showHeader={false} data={billPayDetailes} />
            <IPayBillDetailsOption showHeader={false} data={billPayDetailes} style={styles.top} />
            <IPayBillDetailsOption showHeader={false} data={extraDetails} style={styles.listBottomView} />
          </>
        </IPayScrollView>
      </IPayView>
      <SadadFooterComponent
        onPressBtn={handleOtpVerification}
        style={styles.margins}
        totalAmount={calculatedBill ?? 0}
        btnText={'TRAFFIC_VIOLATION.REFUND'}
        disableBtnIcons
        backgroundGradient={colors.appGradient.buttonBackground}
      />
      <IPayBottomSheet
        heading={localizationText.PAY_BILL.HEADER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={SNAP_POINTS.LARGE}
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
          apiError={apiError}
          showHelp={true}
          timeout={otpConfig.login.otpTimeout}
          handleOnPressHelp={handleOnPressHelp}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
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

export default TrafficViolationPaymentRefundScreen;

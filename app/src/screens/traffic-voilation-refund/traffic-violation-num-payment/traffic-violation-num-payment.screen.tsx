import { IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';

import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '@app/screens/auth/forgot-passcode/otp-verification.component';
import useBillPaymentConfirmation from './traffic-violation-num-payment.hook';
import billPaymentStyles from './traffic-violation-num-payment.styles';

const TrafficViolationNumPaymentScreen: React.FC = () => {
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
  } = useBillPaymentConfirmation();
  const { calculatedBill } = balanceData;
  const { colors } = useTheme();
  const styles = billPaymentStyles();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.TRAFFIC_VIOLATION.REFUND_VIOLATION} backBtn applyFlex />
      <IPayView style={styles.innerContainer}>
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayBillDetailsOption showHeader={false} data={billPayDetailes} />
        </IPayScrollView>
      </IPayView>
      <SadadFooterComponent
        onPressBtn={handleOtpVerification}
        style={styles.margins}
        totalAmount={calculatedBill ?? 0}
        btnText={localizationText.COMMON.CONFIRM}
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
        <OtpVerificationComponent onConfirmPress={handlePay} onPressHelp={handleOnPressHelp} />
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

export default TrafficViolationNumPaymentScreen;

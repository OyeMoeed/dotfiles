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
import { useRoute } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import useBillPaymentConfirmation from './traffic-violation-num-payment.hook';
import billPaymentStyles from './traffic-violation-num-payment.styles';

const TrafficViolationNumPaymentScreen: React.FC = () => {
  const { handlePay, helpCenterRef, otpRef, handleOtpVerification, handleOnPressHelp } = useBillPaymentConfirmation();
  const route = useRoute();
  const { violationDetails } = route.params;
  const { colors } = useTheme();
  const styles = billPaymentStyles();
  const { t } = useTranslation();

  const billPayDetailsData = [
    {
      id: '1',
      label: t('TRAFFIC_VIOLATION.AMOUNT'),
      value: violationDetails?.amount ? `${violationDetails?.amount} ${t('COMMON.SAR')}` : '',
    },
    {
      id: '2',
      label: t('TRAFFIC_VIOLATION.SERVICE_PROVIDER'),
      value: violationDetails?.serviceProvider ?? '',
    },
    {
      id: '3',
      label: t('TRAFFIC_VIOLATION.SERVICE_TYPE'),
      value: violationDetails?.serviceType ?? '',
    },
    {
      id: '4',
      label: t('TRAFFIC_VIOLATION.VIOLATOR_ID'),
      value: violationDetails?.serviceId ?? '',
    },
    {
      id: '5',
      label: t('TRAFFIC_VIOLATION.VIOLATION_NUMBER_FULL'),
      value: violationDetails?.violationNo ?? '',
    },
    {
      id: '6',
      label: t('TRAFFIC_VIOLATION.VIOLATION_DATE'),
      value: '',
    },
  ];

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title="TRAFFIC_VIOLATION.REFUND_VIOLATION" backBtn applyFlex />
      <IPayView style={styles.innerContainer}>
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayBillDetailsOption showHeader={false} data={billPayDetailsData} />
        </IPayScrollView>
      </IPayView>
      <SadadFooterComponent
        onPressBtn={handleOtpVerification}
        style={styles.margins}
        totalAmount={violationDetails?.amount ?? 0}
        btnText="COMMON.CONFIRM"
        disableBtnIcons
        totalAmountText="TRAFFIC_VIOLATION.AMOUNT_REFUND"
        backgroundGradient={colors.appGradient.buttonBackground}
      />
      <IPayBottomSheet
        heading="PAY_BILL.HEADER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={SNAP_POINTS.LARGE}
        ref={otpRef}
      >
        <OtpVerificationComponent onConfirmPress={handlePay} onPressHelp={handleOnPressHelp} />
      </IPayBottomSheet>
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

export default TrafficViolationNumPaymentScreen;

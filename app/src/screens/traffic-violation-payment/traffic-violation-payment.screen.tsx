import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent, useToastContext } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { MOIBillPaymentPayloadProps } from '@app/network/services/bill-managment/moi/bill-payment/bill-payment.interface';
import moiBillPayment from '@app/network/services/bills-management/moi-bill-payment/moi-bill-payment.service';
import prepareMoiBill from '@app/network/services/bills-management/prepare-moi-bill/prepare-moi-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType } from '@app/utilities';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import useBillPaymentConfirmation from './traffic-violation-payment.hook';
import billPaymentStyles from './traffic-violation-payment.styles';

const TrafficViolationPaymentScreen: React.FC = () => {
  const { setOtp, isLoading, otpError, setOtpError, otp, otpVerificationRef } = useBillPaymentConfirmation();
  const { otpConfig } = useConstantData();
  const { colors } = useTheme();
  const { walletNumber, mobileNumber, currentBalance, availableBalance, limitsDetails } = useTypedSelector(
    (state) => state.walletInfoReducer.walletInfo,
  );
  const styles = billPaymentStyles();
  const route = useRoute();
  const [otpRefState, setOtpRefState] = useState<string>('');
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [isHelpCenterVisible, setHelpCenterVisible] = useState<boolean>(false);

  const { t } = useTranslation();
  const { variant, payOnly, violationDetails, isRefund, isViolationID, dynamicFields } = route.params;

  const { showToast } = useToastContext();

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const handleOTPVerify = async () => {
    const deviceInfo = await getDeviceInfo();
    const payLoad = {
      deviceInfo,
      walletNumber,
    };
    const paymentType = isRefund ? 'moi-refund' : 'moi';
    const apiResponse = await prepareMoiBill(paymentType, payLoad);
    if (apiResponse?.successfulResponse) {
      setOtpRefState(apiResponse?.response?.otpRef);
      setIsSheetVisible(true);
      setOtpError(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const deviceInfo = await getDeviceInfo();

      const payload: MOIBillPaymentPayloadProps = {
        deviceInfo,
        otp,
        otpRef: otpRefState,
        walletNumber,
        billIdType: '',
        moiBillPaymentType: violationDetails?.moiBillPaymentType ?? '',
        amount: violationDetails?.amount ?? '',
        billerId: violationDetails?.billerId ?? '',
        serviceDescription: violationDetails?.serviceDescription ?? '',
        applyTax: violationDetails?.applyTax ?? '',
        serviceId: violationDetails?.serviceId ?? '',
        groupPaymentId: violationDetails?.groupPaymentId ?? '',
        paymentId: violationDetails?.paymentId ?? '',
        dynamicFields,
      };

      const apiResponse: any = await moiBillPayment(payload);

      if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
        if (apiResponse?.response) {
          setIsSheetVisible(false);
          navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT_SUCCESS, {
            payOnly: !payOnly,
            violationDetails,
            isRefund,
            isViolationID,
          });
        }
      } else {
        renderToast(t('ERROR.API_ERROR_RESPONSE'));
        navigate(ScreenNames.BILL_PAYMENT_FAILED, { isRefund });
      }
    } catch (error: any) {
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const onCloseBottomSheet = () => {
    setIsSheetVisible(false);
  };

  const handleOnPressHelp = () => {
    setHelpCenterVisible(true);
  };

  const onCloseHelpCenter = () => {
    setHelpCenterVisible(false);
  };

  const onResendCodePress = () => otpVerificationRef?.current?.resetInterval();

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
      value: violationDetails?.violatorId ?? '',
    },
    {
      id: '5',
      label: t('TRAFFIC_VIOLATION.VIOLATION_NUMBER_FULL'),
      value: violationDetails?.violationNo ?? '-',
    },
    {
      id: '6',
      label: t('TRAFFIC_VIOLATION.VIOLATION_DATE'),
      value: '-',
    },
  ];

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        title={isRefund ? 'TRAFFIC_VIOLATION.REFUND_VIOLATION' : 'TRAFFIC_VIOLATION.TITLE'}
        backBtn
        applyFlex
      />
      <IPayView style={styles.innerContainer}>
        {!isRefund && (
          <IPayAccountBalance
            availableBalance={availableBalance ?? 0}
            showRemainingAmount
            balance={currentBalance ?? 0}
            monthlyIncomingLimit={limitsDetails?.monthlyIncomingLimit ?? 0}
            topUpBtnStyle={styles.topUpButton}
            gradientWidth={`${getBalancePercentage(currentBalance, availableBalance)}%`}
          />
        )}
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <>
            <IPayBillDetailsOption showHeader={false} data={billPayDetailsData} />
            {!variant && (
              <IPayBillDetailsOption showHeader={false} data={billPayDetailsData} style={styles.listBottomView} />
            )}
          </>
        </IPayScrollView>
      </IPayView>
      <IPayView style={styles.footerContainer}>
        <SadadFooterComponent
          onPressBtn={handleOTPVerify}
          style={styles.margins}
          totalAmount={violationDetails?.amount ?? 0}
          btnText={isRefund ? 'TRAFFIC_VIOLATION.REFUND' : 'COMMON.PAY'}
          disableBtnIcons
          btnStyle={styles.payBtn}
          backgroundGradient={colors.appGradient.buttonBackground}
          totalAmountText={isRefund && !isViolationID && 'TRAFFIC_VIOLATION.AMOUNT_REFUND'}
        />
      </IPayView>
      <IPayPortalBottomSheet
        heading="PAY_BILL.HEADER"
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        isVisible={isSheetVisible}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={verifyOtp}
          mobileNumber={mobileNumber}
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
          onResendCodePress={onResendCodePress}
        />
      </IPayPortalBottomSheet>
      <IPayPortalBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        isVisible={isHelpCenterVisible}
        onCloseBottomSheet={onCloseHelpCenter}
      >
        <HelpCenterComponent />
      </IPayPortalBottomSheet>
    </IPaySafeAreaView>
  );
};

export default TrafficViolationPaymentScreen;

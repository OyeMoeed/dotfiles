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
import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import useBillPaymentConfirmation from './traffic-violation-payment.hook';
import billPaymentStyles from './traffic-violation-payment.styles';

const TrafficViolationPaymentScreen: React.FC = () => {
  const { billPayDetailes, balanceData, setOtp, isLoading, otpError, setOtpError, otp, otpVerificationRef } =
    useBillPaymentConfirmation();
  const { otpConfig } = useConstantData();
  const { availableBalance, balance, calculatedBill } = balanceData;
  const { colors } = useTheme();
  const { walletNumber, mobileNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const styles = billPaymentStyles();
  const route = useRoute();
  const [otpRefState, setOtpRefState] = useState<string>('');
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [isHelpCenterVisible, setHelpCenterVisible] = useState<boolean>(false);
  const { variant, payOnly } = route?.params;

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

    const apiResponse = await prepareMoiBill('', payLoad);
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
        moiBillPaymentType: '',
        billerId: '',
        billNumOrBillingAcct: '',
        dueDateTime: '',
        billIdType: '',
        billingCycle: '',
        serviceDescription: '',
      };

      const apiResponse: any = await moiBillPayment(payload);

      if (apiResponse?.status?.type === 'SUCCESS') {
        if (apiResponse?.response) {
          setIsSheetVisible(false);
          navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT_SUCCESS, { payOnly: !payOnly });
        }
      } else {
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE);
      }
    } catch (error: any) {
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
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
        bold
        cancelBnt
        customSnapPoint={SNAP_POINT.LARGE}
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
        customSnapPoint={SNAP_POINT.LARGE}
        isVisible={isHelpCenterVisible}
        onCloseBottomSheet={onCloseHelpCenter}
      >
        <HelpCenterComponent />
      </IPayPortalBottomSheet>
    </IPaySafeAreaView>
  );
};

export default TrafficViolationPaymentScreen;

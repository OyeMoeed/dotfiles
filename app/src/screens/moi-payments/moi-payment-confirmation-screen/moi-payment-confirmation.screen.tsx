import { IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import prepareMoiBill from '@app/network/services/bills-management/prepare-moi-bill/prepare-moi-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import { PaymentType } from '@app/utilities';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MOIItemProps } from '../moi-payment-refund-screen/moi-payment-refund.interface';
import useMoiPaymentConfirmation from './moi-payment-confirmation-details.hook';
import moiPaymentConfirmationStyls from './moi-payment-confirmation.styles';

const MoiPaymentConfirmationScreen: React.FC = ({ route }) => {
  const { t } = useTranslation();
  const styles = moiPaymentConfirmationStyls();
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { availableBalance, limitsDetails, userContactInfo } = walletInfo;
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { mobileNumber } = userContactInfo;
  const { billData, isRefund } = route?.params || {};
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const { handlePay, setOtp, otp, isLoading, otpError, setOtpError, otpVerificationRef, setOtpRef, otpBottomSheetRef } =
    useMoiPaymentConfirmation(billData, isRefund);
  const [paymentDetails, setPaymentDetails] = useState<MOIItemProps[]>([]);
  const { otpConfig } = useConstantData();

  const helpCenterRef = useRef<any>(null);

  const getDataToRender = useCallback(() => {
    const updatedPaymentDetails = billData?.dynamicFields?.filter((item: { id: string }) => item.id !== '1');

    const updatedPaymentDetailsWithNewIds = updatedPaymentDetails?.map((item: any, index: number) => ({
      ...item,
      id: (index + 1).toString(),
    }));

    const serviceType = {
      id: (updatedPaymentDetailsWithNewIds.length + 1).toString(),
      label: t('PAY_BILL.SERVICE_TYPE'),
      value: billData?.serviceTypeFromLOV?.desc,
    };
    const serviceProvider = {
      id: (updatedPaymentDetailsWithNewIds.length + 2).toString(),
      label: t('TRAFFIC_VIOLATION.SERVICE_PROVIDER'),
      value: billData?.serviceProviderFromLOV?.desc,
    };

    setPaymentDetails([serviceProvider, serviceType, ...updatedPaymentDetailsWithNewIds]);
  }, [billData]);

  useEffect(() => {
    getDataToRender();
  }, [billData]);

  const onCloseBottomSheet = () => {
    setOtpSheetVisible(false);
    setOtpError(false);
  };

  const onPressHelp = () => {
    onCloseBottomSheet();
    helpCenterRef?.current?.present();
  };

  const onPressCompletePayment = async () => {
    const deviceInfo = await getDeviceInfo();
    const payLoad = {
      deviceInfo,
      walletNumber,
    };
    const paymentType = isRefund ? PaymentType.REFUND : PaymentType.MOI;
    const apiResponse = await prepareMoiBill(paymentType, payLoad);
    if (apiResponse?.successfulResponse) {
      setOtpRef(apiResponse?.response.otpRef);
      setOtpSheetVisible(true);
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title={isRefund ? 'BILL_PAYMENTS.REFUND_BILLS' : 'BILL_PAYMENTS.MOI_PAYMENT'}
        titleStyle={styles.screenTitle}
      />
      <IPayView style={styles.container}>
        {!isRefund && (
          <IPayAccountBalance
            balance={availableBalance}
            availableBalance={limitsDetails.monthlyOutgoingLimit}
            monthlyIncomingLimit={limitsDetails.monthlyRemainingOutgoingAmount}
            showRemainingAmount
            topUpBtnStyle={styles.topUpButton}
          />
        )}
        <IPayBillDetailsOption data={paymentDetails} showHeader={false} optionsStyles={styles.moiPaymentDetailesTab} />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          onPressBtn={onPressCompletePayment}
          btnText={isRefund ? 'COMMON.CONFIRM' : 'SADAD.PAY'}
          totalAmount={billData?.totalFeeAmount ?? 0}
          backgroundGradient={['transparent', 'transparent']}
          gradientViewStyle={styles.sadadFooterGradient}
          btnStyle={styles.sadadBtn}
          disableBtnIcons
          totalAmountText={isRefund && 'LOCAL_TRANSFER.AMOUNT_TO_BE_REFUND'}
        />
      </IPayView>
      <IPayPortalBottomSheet
        ref={otpBottomSheetRef}
        heading="BILL_PAYMENTS.NEW_MOI_BILL"
        enablePanDownToClose
        simpleBar
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        isVisible={isOtpSheetVisible}
        bold
        cancelBnt
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={handlePay}
          mobileNumber={mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          isLoading={isLoading}
          otp={otp}
          showHelp
          timeout={otpConfig.login.otpTimeout}
          handleOnPressHelp={onPressHelp}
          toastContainerStyle={styles.toastContainerStyle}
          onResendCodePress={() => otpVerificationRef.current?.resetInterval()}
        />
      </IPayPortalBottomSheet>

      <IPayBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '97%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default MoiPaymentConfirmationScreen;

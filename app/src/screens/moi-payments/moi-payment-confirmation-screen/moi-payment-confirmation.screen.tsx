import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import prepareMoiBill from '@app/network/services/bills-management/prepare-moi-bill/prepare-moi-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import { PaymentType } from '@app/utilities';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useMoiPaymentConfirmation from './moi-payment-confirmation-details.hook';
import moiPaymentConfirmationStyls from './moi-payment-confirmation.styles';

const MoiPaymentConfirmationScreen: React.FC = ({ route }) => {
  const { moiBillData } = route.params || {};
  const { t } = useTranslation();
  const styles = moiPaymentConfirmationStyls();
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { showToast } = useToastContext();
  const { availableBalance, currentBalance, userContactInfo } = walletInfo;
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { mobileNumber } = userContactInfo;
  const { billData } = route?.params || {};

  const {
    otpBottomSheetRef,
    moiPaymentDetailes,
    handlePay,
    setOtp,
    otp,
    isLoading,
    otpError,
    setOtpError,
    otpVerificationRef,
  } = useMoiPaymentConfirmation();
  const { otpConfig } = useConstantData();

  const helpCenterRef = useRef<any>(null);
  const [otpRef, setOtpRef] = useState<string>('');

  // temporary TODO
  // const totalAmount = '500';

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const onCloseBottomSheet = () => {
    otpBottomSheetRef?.current?.close();
  };

  const onPressHelp = () => {
    onCloseBottomSheet();
    helpCenterRef?.current?.present();
  };

  const onPressCompletePayment = async () => {
    const deviceInfo = await getDeviceInfo();
    const payLoad = {
      deviceInfo: deviceInfo,
      walletNumber: walletNumber,
    };

    const apiResponse = await prepareMoiBill(PaymentType.MOI, payLoad);
    if (apiResponse?.successfulResponse) {
      otpBottomSheetRef?.current?.present();
    }
  };

  const totalAmount = useMemo(
    () =>
      moiBillData?.find((item: { label: string }) => item.label === 'BILL_PAYMENTS.DUE_AMOUNT')?.value.split(' ')[0] ||
      null,
    [moiBillData],
  );

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title="BILL_PAYMENTS.MOI_PAYMENT" titleStyle={styles.screenTitle} />
      <IPayView style={styles.container}>
        <IPayAccountBalance
          balance={availableBalance}
          availableBalance={currentBalance}
          showRemainingAmount
          topUpBtnStyle={styles.topUpButton}
        />
        <IPayBillDetailsOption
          data={moiPaymentDetailes}
          showHeader={false}
          optionsStyles={styles.moiPaymentDetailesTab}
        />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          onPressBtn={onPressCompletePayment}
          btnText="SADAD.PAY"
          totalAmount={totalAmount}
          backgroundGradient={['transparent', 'transparent']}
          gradientViewStyle={styles.sadadFooterGradient}
          btnStyle={styles.sadadBtn}
          disableBtnIcons
        />
      </IPayView>
      <IPayBottomSheet
        heading="BILL_PAYMENTS.NEW_MOI_BILL"
        enablePanDownToClose
        simpleBar
        customSnapPoint={['1%', '97%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={otpBottomSheetRef}
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
        />
      </IPayBottomSheet>

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

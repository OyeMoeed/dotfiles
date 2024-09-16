import { IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import { useRoute } from '@react-navigation/core';
import React, { useRef } from 'react';
import useMoiPaymentConfirmation from './moi-payment-confirmation-details.hook';
import moiPaymentConfirmationStyls from './moi-payment-confirmation.styles';

const MoiPaymentConfirmationScreen: React.FC = () => {
  const styles = moiPaymentConfirmationStyls();
  const localizationText = useLocalization();
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { availableBalance, currentBalance, userContactInfo } = walletInfo;
  const { mobileNumber } = userContactInfo;
  const route = useRoute();
  const { billData } = route?.params || {};
  console.log('get bill dsta', billData);

  const { moiPaymentDetailes, handlePay, setOtp, otp, isLoading, otpError, setOtpError, otpVerificationRef } =
    useMoiPaymentConfirmation();
  const { otpConfig } = useConstantData();
  const otpBottomSheetRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);
  // temporary TODO
  const totalAmount = '500';

  const onCloseBottomSheet = () => {
    otpBottomSheetRef?.current?.close();
  };

  const onPressHelp = () => {
    onCloseBottomSheet();
    helpCenterRef?.current?.present();
  };

  const onPressCompletePayment = () => {
    
    otpBottomSheetRef?.current?.present();
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title={localizationText.BILL_PAYMENTS.MOI_PAYMENT}
        titleStyle={styles.screenTitle}
      />
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
          btnText={localizationText.SADAD.PAY}
          totalAmount={totalAmount}
          backgroundGradient={['transparent', 'transparent']}
          gradientViewStyle={styles.sadadFooterGradient}
          btnStyle={styles.sadadBtn}
          disableBtnIcons
        />
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.BILL_PAYMENTS.NEW_MOI_BILL}
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
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
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

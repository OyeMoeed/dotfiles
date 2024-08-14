import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '@app/screens/auth/forgot-passcode/otp-verification.component';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import React, { useRef } from 'react';
import useMoiPaymentConfirmation from './moi-payment-confirmation-details.hook';
import moiPaymentConfirmationStyls from './moi-payment-confirmation.styles';

const MoiPaymentConfirmationScreen: React.FC = () => {
  const styles = moiPaymentConfirmationStyls();
  const localizationText = useLocalization();
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { availableBalance, currentBalance, userContactInfo } = walletInfo;
  const { mobileNumber } = userContactInfo;
  const { moiPaymentDetailes } = useMoiPaymentConfirmation();
  const otpBottomSheetRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);
  // temporary TODO
  const totalAmount = '500';
  const iqamaId = '324234234';

  const onCloseBottomSheet = () => {
    otpBottomSheetRef?.current?.close();
  };

  const onConfirmPressOtp = () => {
    onCloseBottomSheet();
    navigate(ScreenNames.MOI_PAYMENT_SUCCESS, { moiPaymentDetailes });
  };

  const onPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onPressCompletePayment = () => {
    navigate(ScreenNames.MOI_PAYMENT_REFUND);
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
        <IPayAccountBalance balance={availableBalance} availableBalance={currentBalance} showRemainingAmount />
        <IPayBillDetailsOption
          data={moiPaymentDetailes}
          showHeader={false}
          optionsStyles={styles.moiPaymentDetailesTab}
        />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          onPressBtn={onPressCompletePayment}
          btnText={localizationText.SADAD.COMPLETE_PAYMENT}
          totalAmount={totalAmount}
          btnRightIcon={<IPayIcon icon={icons.rightArrow} size={20} color={colors.natural.natural0} />}
        />
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.LOCAL_TRANSFER.TRANSFER}
        enablePanDownToClose
        simpleBar
        customSnapPoint={['1%', '97%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={otpBottomSheetRef}
        bold
        cancelBnt
      >
        <OtpVerificationComponent
          onConfirmPress={onConfirmPressOtp}
          onPressHelp={onPressHelp}
          iqamaId={iqamaId}
          phoneNumber={mobileNumber}
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

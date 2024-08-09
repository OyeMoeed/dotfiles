import { IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef } from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import { OTPVerificationRefTypes } from '../card-renewal/card-renewal.screen.interface';
import billPaymentStyles from './bill-payment-confirmation.styles';
import useBillPaymentConfirmation from './use-bill-payment-confirmation.hook';

const BillPaymentConfirmationScreen: React.FC = () => {
  const { localizationText, billPayDetailes, headerData, balanceData } = useBillPaymentConfirmation();
  const { availableBalance, balance, calculatedBill } = balanceData;
  const { colors } = useTheme();
  const styles = billPaymentStyles(colors);

  const veriyOTPSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<OTPVerificationRefTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    veriyOTPSheetRef.current?.close();
  };
  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.PAY_BILL.HEADER} backBtn applyFlex />
      <IPayView style={styles.innerContainer}>
        <IPayAccountBalance
          style={styles.accountBalance}
          currencyTextStyle={styles.darkBlueText}
          accountBalanceTextStyle={styles.darkBlueText}
          totalAvailableTextStyle={styles.greyText}
          currentBalanceTextStyle={styles.darkBlueText}
          remainingAmountTextStyle={styles.greyText}
          currentAvailableTextStyle={styles.darkText}
          availableBalance={availableBalance}
          showRemainingAmount
          balance={balance}
        />
        <IPayBillDetailsOption headerData={headerData} data={billPayDetailes} />
      </IPayView>
      <SadadFooterComponent
        style={styles.margins}
        totalAmount={calculatedBill}
        btnText={localizationText.COMMON.CONFIRM}
        disableBtnIcons
        onPressBtn={() => veriyOTPSheetRef.current?.present()}
      />
      <IPayBottomSheet
        heading={localizationText.PAY_BILL.HEADER}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '98%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={veriyOTPSheetRef}
        headerContainerStyles={styles.sheetHeader}
        bgGradientColors={colors.sheetGradientPrimary10}
        bottomSheetBgStyles={styles.sheetBackground}
      >
        <OtpVerificationComponent
          onConfirmPress={() => navigate(ScreenNames.PAY_BILL_SUCCESS, { isPayOnly: true })}
          ref={otpVerificationRef}
          onPressHelp={handleOnPressHelp}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.PAY_BILL.HEADER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '98%']}
        ref={helpCenterRef}
        headerContainerStyles={styles.sheetHeader}
        bgGradientColors={colors.sheetGradientPrimary10}
        bottomSheetBgStyles={styles.sheetBackground}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default BillPaymentConfirmationScreen;

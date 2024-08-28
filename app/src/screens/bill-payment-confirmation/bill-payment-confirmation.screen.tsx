import { IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef } from 'react';
import images from '@app/assets/images';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import { BillPaymentConfirmationProps } from './bill-payment-confirmation.interface';
import billPaymentStyles from './bill-payment-confirmation.styles';
import useBillPaymentConfirmation from './use-bill-payment-confirmation.hook';

const BillPaymentConfirmationScreen: React.FC<BillPaymentConfirmationProps> = ({ route }) => {
  const {
    isPayPartially = false,
    isPayOnly,
    billNickname,
    billerName,
    billerIcon,
    serviceType,
    billNumOrBillingAcct,
    dueDate,
    totalAmount,
  } = route.params || {};
  const {
    localizationText,
    balanceData,
    handlePay,
    setOtp,
    isLoading,
    otpError,
    setOtpError,
    apiError,
    otpVerificationRef,
  } = useBillPaymentConfirmation(isPayPartially, isPayOnly);

  const { availableBalance, balance } = balanceData;
  const { colors } = useTheme();
  const styles = billPaymentStyles(colors);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const veriyOTPSheetRef = useRef<bottomSheetTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const { otpConfig } = useConstantData();

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    veriyOTPSheetRef.current?.close();
  };

  const handleOnPressHelp = () => {
    veriyOTPSheetRef.current?.close();
    helpCenterRef?.current?.present();
  };

  const shortString = (text: string) => {
    if (text.length < 20) {
      return text;
    }
    return `${text.slice(0, 20)}...`;
  };

  return (
    <>
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
          <IPayBillDetailsOption
            headerData={{
              title: billNickname || '-',
              companyDetails: billerName,
              companyImage: billerIcon || images.electricityBill, // TODO: billerIcon is currently null because not getting from API response
            }}
            data={[
              {
                id: '1',
                label: localizationText.PAY_BILL.SERVICE_TYPE,
                value: shortString(serviceType),
              },
              {
                id: '2',
                label: localizationText.PAY_BILL.ACCOUNT_NUMBER,
                value: billNumOrBillingAcct,
              },
              {
                id: '3',
                label: localizationText.COMMON.DUE_DATE,
                value: dueDate,
              },
            ]}
          />
        </IPayView>
        <SadadFooterComponent
          style={styles.margins}
          totalAmount={totalAmount}
          btnText={localizationText.COMMON.CONFIRM}
          disableBtnIcons
          onPressBtn={() => veriyOTPSheetRef.current?.present()}
        />

        <IPayBottomSheet
          heading={localizationText.PAY_BILL.HEADER}
          enablePanDownToClose
          simpleBar
          backBtn
          customSnapPoint={SNAP_POINTS.MEDIUM_LARGE}
          ref={helpCenterRef}
          headerContainerStyles={styles.sheetHeader}
          bgGradientColors={colors.sheetGradientPrimary10}
          bottomSheetBgStyles={styles.sheetBackground}
        >
          <HelpCenterComponent />
        </IPayBottomSheet>
      </IPaySafeAreaView>
      <IPayBottomSheet
        heading={localizationText.PAY_BILL.HEADER}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={SNAP_POINTS.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={veriyOTPSheetRef}
        headerContainerStyles={styles.sheetHeader}
        bgGradientColors={colors.sheetGradientPrimary10}
        bottomSheetBgStyles={styles.sheetBackground}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={handlePay}
          mobileNumber={userInfo?.mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          isLoading={isLoading}
          apiError={apiError}
          showHelp
          timeout={otpConfig.login.otpTimeout}
          handleOnPressHelp={handleOnPressHelp}
        />
      </IPayBottomSheet>
    </>
  );
};

export default BillPaymentConfirmationScreen;

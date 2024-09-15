import { IPayFlatlist, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';
import { MultiPaymentPrepareBillPayloadTypes } from '@app/network/services/bills-management/multi-payment-prepare-bill/multi-payment-prepare-bill.interface';
import multiPaymentPrepareBillService from '@app/network/services/bills-management/multi-payment-prepare-bill/multi-payment-prepare-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { shortString } from '@app/utilities';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { getDateFormate } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef } from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import { BillPaymentConfirmationProps } from './bill-payment-confirmation.interface';
import billPaymentStyles from './bill-payment-confirmation.styles';
import useBillPaymentConfirmation from './use-bill-payment-confirmation.hook';

const BillPaymentConfirmationScreen: React.FC<BillPaymentConfirmationProps> = ({ route }) => {
  const { isPayPartially = false, isPayOnly, showBalanceBox = true, billPaymentInfos } = route.params || {};
  const {
    walletNumber,
    mobileNumber,
    availableBalance,
    limitsDetails: { monthlyRemainingOutgoingAmount, monthlyOutgoingLimit },
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const {
    localizationText,
    handlePay,
    setOtp,
    otp,
    isLoading,
    otpError,
    setOtpError,
    otpVerificationRef,
    veriyOTPSheetRef,
    setOtpRefAPI,
  } = useBillPaymentConfirmation(isPayPartially, isPayOnly, billPaymentInfos);

  const { colors } = useTheme();
  const styles = billPaymentStyles(colors);
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

  const onMultiPaymentPrepareBill = async () => {
    const deviceInfo = await getDeviceInfo();
    const payload: MultiPaymentPrepareBillPayloadTypes = {
      deviceInfo,
      walletNumber,
    };

    const apiResponse = await multiPaymentPrepareBillService(payload);
    if (apiResponse.successfulResponse) {
      setOtpRefAPI(apiResponse.response.otpRef);
      veriyOTPSheetRef.current?.present();
    }
  };

  const getBillInfoArray = (item: BillPaymentInfosTypes) => [
    {
      id: '1',
      label: localizationText.PAY_BILL.SERVICE_TYPE,
      value: item.serviceDescription ? shortString(item.serviceDescription, 15) : '-',
    },
    {
      id: '2',
      label: localizationText.PAY_BILL.ACCOUNT_NUMBER,
      value: item.billNumOrBillingAcct,
    },
    {
      id: '3',
      label: localizationText.COMMON.DUE_DATE,
      value: getDateFormate(item.dueDateTime, dateTimeFormat.DateMonthYearWithoutSpace),
    },
  ];

  return (
    <>
      <IPaySafeAreaView style={styles.container}>
        <IPayHeader title={localizationText.PAY_BILL.HEADER} backBtn applyFlex />
        <IPayView style={styles.innerContainer}>
          {showBalanceBox && (
            <IPayAccountBalance
              style={styles.accountBalance}
              currencyTextStyle={styles.darkBlueText}
              accountBalanceTextStyle={styles.darkBlueText}
              totalAvailableTextStyle={styles.greyText}
              currentBalanceTextStyle={styles.darkBlueText}
              remainingAmountTextStyle={styles.greyText}
              currentAvailableTextStyle={styles.darkText}
              showRemainingAmount
              balance={availableBalance}
              gradientWidth={`${getBalancePercentage(Number(monthlyOutgoingLimit), Number(monthlyRemainingOutgoingAmount))}%`}
              monthlyIncomingLimit={monthlyRemainingOutgoingAmount}
              availableBalance={monthlyOutgoingLimit}
            />
          )}
          <IPayFlatlist
            contentContainerStyle={styles.contentContainerStyle}
            data={billPaymentInfos}
            renderItem={({ item }) => (
              <IPayBillDetailsOption
                headerData={{
                  title: item.billNickname || '-',
                  companyDetails: item.billerName,
                  companyImage: item.billerIcon,
                }}
                data={getBillInfoArray(item)}
              />
            )}
          />
        </IPayView>
        <SadadFooterComponent
          style={styles.margins}
          totalAmount={billPaymentInfos.reduce((sum, item) => sum + item.amount, 0) || '0'}
          btnText={localizationText.COMMON.CONFIRM}
          disableBtnIcons
          onPressBtn={onMultiPaymentPrepareBill}
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
          mobileNumber={mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          isLoading={isLoading}
          otp={otp}
          showHelp
          timeout={otpConfig.login.otpTimeout}
          handleOnPressHelp={handleOnPressHelp}
          onResendCodePress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </IPayBottomSheet>
    </>
  );
};

export default BillPaymentConfirmationScreen;

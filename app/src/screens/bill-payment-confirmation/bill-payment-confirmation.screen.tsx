import { IPayFlatlist, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';
import { MultiPaymentPrepareBillPayloadTypes } from '@app/network/services/bills-management/multi-payment-prepare-bill/multi-payment-prepare-bill.interface';
import multiPaymentPrepareBillService from '@app/network/services/bills-management/multi-payment-prepare-bill/multi-payment-prepare-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { shortString } from '@app/utilities';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { checkDateValidation, getDateFormate } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import { BillPaymentConfirmationProps } from './bill-payment-confirmation.interface';
import billPaymentStyles from './bill-payment-confirmation.styles';
import useBillPaymentConfirmation from './use-bill-payment-confirmation.hook';

const BillPaymentConfirmationScreen: React.FC<BillPaymentConfirmationProps> = ({ route }) => {
  const {
    isPayPartially = false,
    isPayOnly,
    showBalanceBox = true,
    billPaymentInfos: { billPaymentDetails, totalAmount },
    saveBill,
  } = route.params || {};
  const {
    walletNumber,
    mobileNumber,
    availableBalance,
    limitsDetails: { monthlyRemainingOutgoingAmount, monthlyOutgoingLimit },
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { t } = useTranslation();

  const {
    handlePay,
    setOtp,
    otp,
    isLoading,
    otpError,
    setOtpError,
    otpVerificationRef,
    setOtpRefAPI,
    setIsOtpSheetVisible,
    isOtpSheetVisible,
  } = useBillPaymentConfirmation(walletNumber, isPayPartially, isPayOnly, saveBill, billPaymentDetails);

  const { colors } = useTheme();
  const styles = billPaymentStyles(colors);
  const { otpConfig } = useConstantData();
  const [helpCenterVisible, setHelpCenterVisible] = useState(false);

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    setIsOtpSheetVisible(false);
  };

  const handleOnPressHelp = () => {
    setHelpCenterVisible(true);
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
      setIsOtpSheetVisible(true);
    }
  };

  const dateFormat = (dueDateTime: string) => {
    const date = checkDateValidation(dueDateTime, dateTimeFormat.ShortDateWithDash);
    const formattedDateTime = date.isValid() ? getDateFormate(date, dateTimeFormat.DateMonthYearWithoutSpace) : '-';
    return formattedDateTime;
  };

  const getBillInfoArray = (item: BillPaymentInfosTypes) => [
    {
      id: '1',
      label: t('PAY_BILL.SERVICE_TYPE'),
      value: item.serviceDescription ? shortString(item.serviceDescription, 15) : '-',
    },
    {
      id: '2',
      label: t('PAY_BILL.ACCOUNT_NUMBER'),
      value: item.billNumOrBillingAcct,
    },
    {
      id: '3',
      label: t('COMMON.DUE_DATE'),
      value: dateFormat(item.dueDateTime),
    },
  ];

  const checkLimit = useMemo(() => {
    const totalBillingAmount = Number(totalAmount);
    let warningMsg = '';
    let disabled = false;
    if (totalBillingAmount > Number(availableBalance)) {
      warningMsg = 'NEW_SADAD_BILLS.INSUFFICIENT_BALANCE';
      disabled = true;
    }
    if (totalBillingAmount > Number(monthlyRemainingOutgoingAmount)) {
      warningMsg = 'COMMON.MONTHLY_REMAINING_OUTGOING_AMOUNT';
      disabled = true;
    }

    return { warningMsg, disabled };
  }, [billPaymentDetails]);

  return (
    <>
      <IPaySafeAreaView style={styles.container}>
        <IPayHeader title="PAY_BILL.HEADER" backBtn applyFlex />
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
            data={billPaymentDetails}
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
          style={[styles.margins, checkLimit.disabled ? styles.consditioanlFooterStyle : {}]}
          totalAmount={totalAmount}
          btnText="COMMON.CONFIRM"
          disableBtnIcons
          warning={checkLimit.warningMsg}
          btnDisbaled={checkLimit.disabled}
          onPressBtn={onMultiPaymentPrepareBill}
        />

        <IPayPortalBottomSheet
          heading="PAY_BILL.HEADER"
          enablePanDownToClose
          simpleBar
          backBtn
          customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
          isVisible={helpCenterVisible}
          headerContainerStyles={styles.sheetHeader}
          bgGradientColors={colors.sheetGradientPrimary10}
          bottomSheetBgStyles={styles.sheetBackground}
          onCloseBottomSheet={() => setHelpCenterVisible(false)}
        >
          <HelpCenterComponent />
        </IPayPortalBottomSheet>
      </IPaySafeAreaView>
      <IPayPortalBottomSheet
        heading="PAY_BILL.HEADER"
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        headerContainerStyles={styles.sheetHeader}
        bgGradientColors={colors.sheetGradientPrimary10}
        bottomSheetBgStyles={styles.sheetBackground}
        isVisible={isOtpSheetVisible}
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
          onResendCodePress={() => otpVerificationRef?.current?.resetInterval()}
        />
      </IPayPortalBottomSheet>
    </>
  );
};

export default BillPaymentConfirmationScreen;

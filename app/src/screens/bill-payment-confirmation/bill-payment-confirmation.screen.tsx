import { IPayFlatlist, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';
import { MultiPaymentPrepareBillPayloadTypes } from '@app/network/services/bills-management/multi-payment-prepare-bill/multi-payment-prepare-bill.interface';
import multiPaymentPrepareBillService from '@app/network/services/bills-management/multi-payment-prepare-bill/multi-payment-prepare-bill.service';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
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

  const [topUpOptionsVisible, setTopUpOptionsVisible] = useState<boolean>(false);

  const topUpSelectionBottomSheet = () => {
    setTopUpOptionsVisible(true);
  };

  const closeBottomSheetTopUp = () => {
    setTopUpOptionsVisible(false);
  };

  const navigateTOAktharPoints = async () => {
    const aktharPointsResponse = await getAktharPoints(walletNumber);
    if (
      aktharPointsResponse?.status?.type === 'SUCCESS' &&
      aktharPointsResponse?.response?.mazayaStatus !== 'USER_DOES_NOT_HAVE_MAZAYA_ACCOUNT'
    ) {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { aktharPointsInfo: aktharPointsResponse?.response, isEligible: true });
    } else {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { isEligible: false });
    }
  };

  const topupItemSelected = (routeName: string, paramsTopup: {}) => {
    closeBottomSheetTopUp();
    if (routeName === ScreenNames.POINTS_REDEMPTIONS) {
      navigateTOAktharPoints();
    } else {
      navigate(routeName, paramsTopup);
    }
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
    const isoFormat = checkDateValidation(dueDateTime, dateTimeFormat.ISODate);
    if (isoFormat.isValid()) {
      return dueDateTime ? getDateFormate(isoFormat, dateTimeFormat.DateMonthYearWithoutSpace) : '-';
    }
    return dueDateTime ? getDateFormate(date, dateTimeFormat.DateMonthYearWithoutSpace) : '-';
  };

  const getBillInfoArray = (item: BillPaymentInfosTypes) => [
    {
      id: '1',
      label: t('PAY_BILL.SERVICE_TYPE'),
      value: item.serviceDescription ? item.serviceDescription : '-',
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
              onPressTopup={topUpSelectionBottomSheet}
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
          btnDisabled={checkLimit.disabled}
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
      <IPayPortalBottomSheet
        noGradient
        heading="TOP_UP.ADD_MONEY_USING"
        onCloseBottomSheet={closeBottomSheetTopUp}
        customSnapPoint={SNAP_POINT.XS_SMALL}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
        isVisible={topUpOptionsVisible}
      >
        <IPayTopUpSelection testID="topUp-selection" topupItemSelected={topupItemSelected} />
      </IPayPortalBottomSheet>
    </>
  );
};

export default BillPaymentConfirmationScreen;

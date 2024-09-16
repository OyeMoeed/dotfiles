import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader, IPayList, IPayTopUpBox } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { CUSTOM_SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import SummaryType from '@app/enums/summary-type';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  SendRequestedMoneyConfirmReq,
  SendRequestedMoneyConfirmRes,
  SendRequestedMoneyPrepareReq,
} from '@app/network/services/request-management/recevied-requests/recevied-requests.interface';
import {
  sendRequestedMoneyConfirm,
  sendRequestedMoneyPrepare,
} from '@app/network/services/request-management/recevied-requests/recevied-requests.service';
import { useTranslation } from 'react-i18next';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { PayChannel, States, TopupStatus, buttonVariants } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import { PayData } from './money-request-summary.interface';
import moneyRequestStyles from './money-request-summary.styles';

const MoneyRequestSummaryScreen: React.FC = () => {
  const { t } = useTranslation();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { currentBalance } = walletInfo; // TODO replace with orignal data
  const { colors } = useTheme();
  const route = useRoute();
  const { heading, screen, receviedRequestSummaryData, transId } =
    (route.params as { heading: string; screen: string; receviedRequestSummaryData: any; transId: string }) || {};
  const styles = moneyRequestStyles(colors);
  const { orderSummaryData } = useConstantData();
  const [chipValue, setChipValue] = useState('');
  const createRequestBottomSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);
  const topUpAmount =
    receviedRequestSummaryData && receviedRequestSummaryData[2].detailsText
      ? receviedRequestSummaryData[2].detailsText
      : '100';

  const { monthlyRemainingOutgoingAmount } = walletInfo.limitsDetails;
  const monthlyRemaining = parseFloat(monthlyRemainingOutgoingAmount);
  const updatedTopUpAmount = parseFloat(topUpAmount.replace(/,/g, ''));
  const determineChipValue = useCallback(() => {
    if (monthlyRemaining === 0) {
      return 'REQUEST_SUMMARY.NO_REMAINING_AMOUNT';
    }
    if (updatedTopUpAmount > monthlyRemaining) {
      return 'REQUEST_SUMMARY.INSUFFICIENT_BALANCE';
    }
    return '';
  }, [monthlyRemaining, updatedTopUpAmount]);

  const [otp, setOtp] = useState<string>('');
  const [otpRef, setOtpRef] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string | undefined>('');

  const userInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo.userContactInfo);
  const { otpConfig } = useConstantData();
  const textValue =
    screen === SummaryType.MONEY_REQUEST_SUMMARY
      ? receviedRequestSummaryData && receviedRequestSummaryData[0].amount
      : chipValue;

  // Prepare data for request paid summary success screen
  const requestPaidSummaryData = (apiResponse: SendRequestedMoneyConfirmRes) => [
    {
      id: '1',
      label: t('REQUEST_SUMMARY.PAY_TO'),
      value: receviedRequestSummaryData[0].detailsText,
      isAlinma: true,
      leftIcon: true,
    },
    {
      id: '2',
      label: t('REQUEST_SUMMARY.MOBILE_NUMBER'),
      value: receviedRequestSummaryData[1].detailsText,
    },
    {
      id: '3',
      label: t('COMMON.REF_NUM'),
      value: apiResponse?.response?.referenceNumber,
      icon: icons.copy,
    },
  ];

  // Prepare OTP for sending requested money
  const prepareOtp = async (showOtpSheet: boolean = true) => {
    createRequestBottomSheetRef.current?.present();

    const payload: SendRequestedMoneyPrepareReq = {
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
    };
    const apiResponse = await sendRequestedMoneyPrepare(walletInfo.walletNumber, transId, payload);
    if (apiResponse?.status?.type === 'SUCCESS') {
      setOtpRef(apiResponse?.response?.otpRef as string);
      setTransactionId(apiResponse?.authentication?.transactionId);
      if (showOtpSheet) {
        createRequestBottomSheetRef.current?.present();
      }
    }
    otpVerificationRef?.current?.resetInterval();
  };

  // Verify OTP for sending requested money
  const verifyOtp = async () => {
    setIsLoading(true);
    const payload: SendRequestedMoneyConfirmReq = {
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      otp,
      otpRef,
      authentication: {
        transactionId: transactionId as string,
      },
    };

    const apiResponse = await sendRequestedMoneyConfirm(walletInfo.walletNumber, transId, payload);

    if (apiResponse?.status?.type === 'SUCCESS') {
      if (apiResponse?.response) {
        createRequestBottomSheetRef.current?.close();
        navigate(ScreenNames.TOP_UP_SUCCESS, {
          topupChannel: PayChannel.REQUEST_ACCEPT,
          topupStatus: TopupStatus.SUCCESS,
          amount: topUpAmount,
          requestPaidSummaryData: requestPaidSummaryData(apiResponse),
        });
      }
    } else {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'), false);
    }
    setIsLoading(false);
  };

  //  Handle the confirm button press
  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'), false);
    } else {
      verifyOtp();
    }
  };

  // Handle the pay button press
  const onPay = () => {
    prepareOtp();
  };

  const onResendCodePress = () => {
    prepareOtp(false);
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
  };

  useEffect(() => {
    setChipValue(determineChipValue());
  }, [determineChipValue]);

  const renderChip = useMemo(
    () =>
      chipValue ? (
        <IPayChip
          textValue={textValue}
          variant={States.WARNING}
          isShowIcon
          containerStyle={styles.chipContainer}
          icon={
            <IPayIcon
              icon={chipValue === 'TOP_UP.LIMIT_REACHED' ? icons.warning : icons.shield_cross}
              color={colors.critical.critical800}
              size={16}
            />
          }
        />
      ) : (
        <IPayList
          title="REQUEST_SUMMARY.TOTAL_AMOUNT"
          rightText={
            <IPaySubHeadlineText color={colors.primary.primary800} regular text={`${topUpAmount} ${t('COMMON.SAR')}`} />
          }
        />
      ),
    [chipValue, t(' topUpAmount'), colors, icons],
  );

  const renderPayItem = ({ item }: { item: PayData }) => {
    const { detailsText, leftIcon, label } = item;
    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.listView}>
          <IPayView style={styles.iconLabel}>
            {leftIcon && (
              <IPayView style={styles.leftIcon}>
                <IPayImage image={images.alinmaP} style={styles.leftIconCard} resizeMode="contain" />
              </IPayView>
            )}
            <IPayFootnoteText color={colors.natural.natural900} text={label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            {detailsText ? (
              <IPayFootnoteText text={detailsText} style={styles.detailsText} />
            ) : (
              <IPayFootnoteText text={`${topUpAmount} ${t('COMMON.SAR')}`} style={styles.detailsText} />
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={heading} />
      <IPayView style={styles.container}>
        <IPayView>
          <IPayView>
            <IPayView>
              <IPayTopUpBox
                availableBalance={formatNumberWithCommas(currentBalance)}
                isShowTopup
                isShowRemaining
                isShowProgressBar
                monthlyIncomingLimit={walletInfo.limitsDetails.monthlyIncomingLimit}
                monthlyRemainingIncommingAmount={walletInfo.limitsDetails.monthlyRemainingIncomingAmount}
              />
            </IPayView>
            <IPayView>
              <IPayFlatlist
                contentContainerStyle={styles.walletListBackground}
                renderItem={renderPayItem}
                data={screen === SummaryType.MONEY_REQUEST_SUMMARY ? receviedRequestSummaryData : orderSummaryData}
                style={styles.flatlist}
              />
            </IPayView>
          </IPayView>
        </IPayView>
        <IPayLinearGradientView style={styles.gradientBg}>
          {renderChip}
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            medium
            onPress={onPay}
            btnText="COMMON.CONFIRM"
            btnIconsDisabled
            disabled={monthlyRemaining === 0 || updatedTopUpAmount > monthlyRemaining}
            btnStyle={styles.confirmButton}
          />
        </IPayLinearGradientView>
      </IPayView>

      <IPayBottomSheet
        heading="REQUEST_SUMMARY.PAY_PRODUCT"
        enablePanDownToClose
        simpleBar
        testID="request-money-otp-verification"
        bold
        cancelBnt
        customSnapPoint={CUSTOM_SNAP_POINT.FULL}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={createRequestBottomSheetRef}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          testID="otp-verification-bottom-sheet"
          onPressConfirm={onConfirmOtp}
          mobileNumber={userInfo?.mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          isLoading={isLoading}
          otp={otp}
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          timeout={otpConfig.transaction.otpTimeout}
          onResendCodePress={onResendCodePress}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        testID="request-money-help-center"
        customSnapPoint={CUSTOM_SNAP_POINT.EXTRA_LARGE}
        ref={helpCenterRef}
      >
        <HelpCenterComponent testID="help-center-bottom-sheet" />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};
export default MoneyRequestSummaryScreen;

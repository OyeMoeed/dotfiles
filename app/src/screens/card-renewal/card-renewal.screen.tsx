import React, { useCallback, useRef, useState } from 'react';

import icons from '@app/assets/icons';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayCardBanner from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import { CUSTOM_SNAP_POINT, SNAP_POINT } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';

import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { CardStatusIndication, buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { IPaySafeAreaView } from '@components/templates';
import { RouteProp, useRoute } from '@react-navigation/native';

import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import useConstantData from '@app/constants/use-constants';
import { prepareRenewCardProp, renewCardProp } from '@app/network/services/core/transaction/transaction.interface';
import { otpRenewCard, prepareRenewCard } from '@app/network/services/core/transaction/transactions.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities';
import { setTermsConditionsVisibility } from '@app/store/slices/nafath-verification';
import { hideSpinner, showSpinner } from '@app/store/slices/spinner.slice';
import { useTypedSelector } from '@app/store/store';
import { useDispatch } from 'react-redux';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import { RouteParams } from './card-renewal.screen.interface';
import cardRenewalStyles from './card-renewal.style';

const DUMMY_DATA = {
  balance: '5,200.40',
  cardRenewalFee: '100',
  totalBalance: '10,000',
};

const CardRenewalScreen: React.FC = () => {
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const {
    currentCard: { cardType, cardHeaderText, name, nextAnnualFeeAmt, nextAnnualFeeVAT, maskedCardNumber, cardIndex },
    statusIndication,
  } = route?.params || {};

  const { walletNumber, availableBalance, limitsDetails } = useTypedSelector(
    (state) => state.walletInfoReducer.walletInfo,
  );

    const dispatch = useDispatch();
  const localizationText = useLocalization();
  const otpVerificationRef = useRef<any>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { otpConfig } = useConstantData();
  const [otpRef, setOtpRef] = useState<string>('');
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');

  const styles = cardRenewalStyles(colors);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);

  const onPressTermsAndConditions = () => {
    dispatch(
      setTermsConditionsVisibility({
        isVisible: true,
        isVirtualCardTermsAndConditions: true,
      }),
    );
  const renderErrToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const renderToast = () => {
    showToast({
      title: localizationText.COMMON.TERMS_AND_CONDITIONS,
      subTitle: localizationText.COMMON.TERMS_AND_CONDITIONS_VALIDATION,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner();
    } else {
      hideSpinner();
    }
  }, []);

  const prepareOtpRenewCard = async (showOtpSheet: boolean) => {
    renderSpinner(true);
    const payload: prepareRenewCardProp = {
      walletNumber,
      body: {
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      },
    };
    const apiResponse: any = await prepareRenewCard(payload);
    if (apiResponse.status.type === 'SUCCESS') {
      setOtpRef(apiResponse?.response?.otpRef as string);
      if (showOtpSheet) {
        setOtpSheetVisible(true);
        otpVerificationRef?.current?.present();
      }
    }
    otpVerificationRef?.current?.resetInterval();
    renderSpinner(false);
  };

  const onResendCodePress = () => {
    prepareOtpRenewCard(false);
  };

  const onPressConfirm = () => {
    if (checkTermsAndConditions) {
      prepareOtpRenewCard(true);
    } else {
      renderToast();
    }
  };

  const renewCard = async () => {
    try {
      renderSpinner(true);
      const payload: renewCardProp = {
        walletNumber,
        body: {
          cardIndex,
          otp,
          otpRef,
          cardType,
          physicalCard: false,
          deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
        },
      };
      const apiResponse: any = await otpRenewCard(payload);
      if (apiResponse.status.type === 'SUCCESS') {
        otpVerificationRef?.current?.resetInterval();
        setOtpSheetVisible(false);
        navigate(ScreenNames.CARD_RENEWAL_SUCCESS);
      } else {
        setAPIError(localizationText.ERROR.SOMETHING_WENT_WRONG);
        renderErrToast(localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
      renderSpinner(false);
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderErrToast(localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      renewCard();
    }
  };

  const onOtpCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    setOtpSheetVisible(false);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.CARD_RENEWAL.CARD_RENEWAL} backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance
          balance={availableBalance}
          monthlyIncomingLimit={limitsDetails?.monthlyRemainingOutgoingAmount}
          showRemainingAmount
          gradientWidth={`${(Number(limitsDetails?.monthlyRemainingOutgoingAmount) / Number(limitsDetails?.monthlyOutgoingLimit)) * 100}%`}
          availableBalance={limitsDetails?.monthlyOutgoingLimit}
          onPressTopup={() => {}}
        />
        <IPayView style={styles.contentContainer}>
          <IPayView style={styles.contentContainerGap}>
            <IPayCardBanner
              containerStyle={styles.zeroMargin}
              cardType={cardType}
              cardTypeName={cardHeaderText}
              carHolderName={name}
              cardLastFourDigit={maskedCardNumber}
            />
            <IPayView style={styles.ipayListGap}>
              <IPayList
                containerStyle={styles.zeroMargin}
                icon={<IPayView />}
                title={localizationText.CARD_RENEWAL.HOLDER_NAME}
                rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={name} />}
              />
              <IPayList
                containerStyle={styles.zeroMargin}
                icon={<IPayView />}
                title={localizationText.CARD_RENEWAL.CARD_TYPE}
                rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={cardHeaderText} />}
              />
            </IPayView>
            <IPayList
              containerStyle={styles.zeroMargin}
              icon={<IPayView />}
              title={localizationText.CARD_RENEWAL.RENEWAL_FEE}
              rightText={
                <IPaySubHeadlineText
                  color={colors.primary.primary800}
                  regular
                  text={
                    statusIndication === CardStatusIndication.ANNUAL
                      ? `${+nextAnnualFeeAmt + +nextAnnualFeeVAT}`
                      : `${DUMMY_DATA.cardRenewalFee} ${localizationText.COMMON.SAR}`
                  }
                />
              }
            />
          </IPayView>

          <IPayView style={styles.bottomContainer}>
            <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer}>
              <IPayView style={styles.termsChildContainer}>
                <IPayCheckbox onPress={toggleTermsAndConditions} isCheck={checkTermsAndConditions} />
                <IPayFootnoteText style={styles.termText} text={localizationText.COMMON.TERMS_AND_CONDITIONS_TEXT} />
                <IPayIcon icon={icons.infoIcon} size={20} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>
            <IPayButton
              onPress={onPressConfirm}
              large
              btnIconsDisabled
              btnType={buttonVariants.PRIMARY}
              btnText={localizationText.COMMON.CONFIRM}
            />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayPortalBottomSheet
        heading={localizationText.CARD_RENEWAL.CARD_RENEWAL}
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onOtpCloseBottomSheet}
        isVisible={isOtpSheetVisible}
      >
        <OtpVerificationComponent
          ref={otpVerificationRef}
          onPressConfirm={onConfirmOtp}
          mobileNumber={walletInfo?.mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          otp={otp}
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          timeout={otpConfig.transaction.otpTimeout}
          onResendCodePress={onResendCodePress}
        />
      </IPayPortalBottomSheet>
      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={CUSTOM_SNAP_POINT.FULL}
        ref={helpCenterRef}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default CardRenewalScreen;

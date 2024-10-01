import icons from '@app/assets/icons';
import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import IPayAddressInfoSheet from '@app/components/organism/ipay-address-info-sheet/ipay-address-info-sheet.component';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { IPayOtpVerification, IPaySafeAreaView } from '@components/templates';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '@app/store/store';
import { setTermsConditionsVisibility } from '@app/store/slices/bottom-sheets-slice';
import { useDispatch } from 'react-redux';
import getCardIssuanceFees from '@app/network/services/cards-management/issue-card-fees/issue-card-fees.service';
import { CardType } from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.interface';
import printCardPrepareService from '@app/network/services/physical-card/print-card-prepare/print-card-prepare.service';
import { PrintCardPreparePayloadTypes } from '@app/network/services/physical-card/print-card-prepare/print-card-prepare.interface';
import { getDeviceInfo } from '@app/network/utilities';
import printCardService from '@app/network/services/physical-card/print-card/print-card.service';
import { PrintCardPayloadTypes } from '@app/network/services/physical-card/print-card/print-card.interface';
import { IssueCardFeesRes } from '@app/network/services/cards-management/issue-card-fees/issue-card-fees.interface';
import { AddressInfoRefTypes, OTPVerificationRefTypes, RouteParams } from './print-card-confirmation.interface';
import printCardConfirmationStyles from './print-card-confirmation.style';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';

const DUMMY_DATA = {
  address: 'Al Olaya, Riyadh, SA',
  replaceFee: '100',
  shippingFee: '100',
  totalFee: '200',
  balance: '5,200.40',
};

const PrintCardConfirmationScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpRef, setOtpRef] = useState('');
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const [shippingFee, setShippingFee] = useState<string | undefined>('0');
  const { address } = useTypedSelector((state) => state.walletInfoReducer.walletInfo.userContactInfo);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const route = useRoute<RouteProps>();

  const {
    currentCard,
    currentCard: { cardHeaderText, name },
  } = route.params;

  const veriyOTPSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<OTPVerificationRefTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const addressInfoSheetRef = useRef<AddressInfoRefTypes>(null);

  const styles = printCardConfirmationStyles(colors);

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    veriyOTPSheetRef.current?.close();
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const renderToast = () => {
    showToast({
      title: 'COMMON.TERMS_AND_CONDITIONS_VALIDATION',
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainerStyle,
    });
  };

  const onPressConfirm = async () => {
    if (checkTermsAndConditions) {
      const payload: PrintCardPreparePayloadTypes = {
        deviceInfo: await getDeviceInfo(),
        cardIndex: currentCard.cardIndex,
      };
      const apiResponse = await printCardPrepareService(walletInfo.walletNumber, payload);
      if (apiResponse.successfulResponse) {
        setOtpRef(apiResponse.response.otpRef);
        veriyOTPSheetRef.current?.present();
      }
    } else {
      renderToast();
    }
  };

  const dispatch = useDispatch();
  const onPressTermsAndConditions = () => {
    dispatch(
      setTermsConditionsVisibility({
        isVisible: true,
        isVirtualCardTermsAndConditions: true,
      }),
    );
  };

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);

  const onNavigateToSuccess = async () => {
    // call otp confirmation api
    const payload: PrintCardPayloadTypes = {
      otp,
      otpRef,
      deviceInfo: await getDeviceInfo(),
      cardIndex: currentCard.cardIndex,
    };
    const apiResponse = await printCardService(walletInfo.walletNumber, payload);
    if (apiResponse.successfulResponse) {
      onCloseBottomSheet();
      navigate(ScreenNames.PRINT_CARD_SUCCESS);
    }
  };

  const onResendCodePress = () => {
    onCloseBottomSheet();
    setTimeout(() => {
      onPressConfirm();
    }, 1000);
  };

  const getTotalFees = (fees: IssueCardFeesRes) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const totalFees = +fees?.bankFeeAmount + +fees?.bankVatAmount + +fees?.feeAmount + +fees?.vatAmount;
    return totalFees.toString();
  };

  const onPressIsssueCard = async () => {
    const feesApiResponse = await getCardIssuanceFees(
      walletInfo?.walletNumber,
      currentCard.cardType as CardType,
      'CARD_VCB_ISSUE',
    );
    if (feesApiResponse?.successfulResponse === true) {
      setShippingFee(getTotalFees(feesApiResponse?.response));
    }
  };

  useEffect(() => {
    onPressIsssueCard();
  }, []);

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title="CARD_OPTIONS.PRINT_CARD" backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance
          showRemainingAmount
          availableBalance="20,000"
          balance={DUMMY_DATA.balance}
          onPressTopup={() => {}}
          monthlyIncomingLimit="20,000"
        />
        <IPayView style={styles.contentContainer}>
          <IPayFootnoteText text="CARDS.CARD_DETAILS" color={colors.natural.natural500} style={styles.header} />
          <IPayList
            title="REPLACE_CARD.HOLDERS_NAME"
            isShowDetail
            rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={name} />}
          />
          <IPayList
            title="CARDS.CARD_TYPE"
            rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={cardHeaderText} />}
          />

          <IPayFootnoteText
            text="REPLACE_CARD.SHIPPING_ADDRESS"
            color={colors.natural.natural500}
            style={styles.footNoteTextStyle}
          />
          <IPayList
            title="PROFILE.NATIONAL_ADDRESS"
            rightText={
              <IPayPressable
                onPress={() => addressInfoSheetRef.current?.showAddressInfoSheet()}
                style={styles.addressStyle}
              >
                <IPayFootnoteText color={colors.primary.primary800} regular text={address} />
                <IPayView style={styles.iconStyle}>
                  <IPayIcon icon={icons.infoIcon} size={16} color={colors.primary.primary500} />
                </IPayView>
              </IPayPressable>
            }
          />
          <IPayFootnoteText
            text="CARD_OPTIONS.CARD_FEE"
            color={colors.natural.natural500}
            style={styles.footNoteTextStyle}
          />
          <IPayList
            title="REPLACE_CARD.SHIPPING_FEE"
            rightText={
              <IPaySubHeadlineText
                color={colors.primary.primary800}
                regular
                text={`${shippingFee} ${t('COMMON.SAR')}`}
              />
            }
          />
          <IPayView style={styles.bottomContainer}>
            <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer}>
              <IPayView style={styles.termsChildContainer}>
                <IPayCheckbox onPress={toggleTermsAndConditions} isCheck={checkTermsAndConditions} />
                <IPayFootnoteText style={styles.termText} text="COMMON.TERMS_AND_CONDITIONS_TEXT" />
                <IPayIcon icon={icons.infoIcon} size={20} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>

            <IPayButton
              onPress={onPressConfirm}
              large
              btnIconsDisabled
              btnStyle={styles.confirmButton}
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.CONFIRM"
            />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayAddressInfoSheet ref={addressInfoSheetRef} />
      <IPayBottomSheet
        noGradient
        heading="CARD_OPTIONS.PHYSICAL_CARD"
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '99%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={veriyOTPSheetRef}
      >
        <IPayOtpVerification
          otpError={otpError}
          setOtpError={setOtpError}
          ref={otpVerificationRef}
          onPressConfirm={onNavigateToSuccess}
          mobileNumber="0511110302"
          setOtp={setOtp}
          otp={otp}
          showHelp
          handleOnPressHelp={handleOnPressHelp}
          onResendCodePress={onResendCodePress}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        noGradient
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '99%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default PrintCardConfirmationScreen;

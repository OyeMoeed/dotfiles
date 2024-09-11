import React, { useRef, useState } from 'react';
import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import { IPayOtpVerification, IPaySafeAreaView } from '@components/templates';
import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { useRoute, RouteProp } from '@react-navigation/native';
import icons from '@app/assets/icons';
import bottomSheetModal from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal';
import IPayAddressInfoSheet from '@app/components/organism/ipay-address-info-sheet/ipay-address-info-sheet.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import {
  RouteParams,
  TermsAndConditionsRefTypes,
  AddressInfoRefTypes,
} from './issue-new-card-confirm-details.interface';
import issueNewCardConfirmDetailsStyles from './issue-new-card-confirm-details.style';
import IPayCreateCardPin from '../create-card-pin/create-card-pin.screen';

const DUMMY_DATA = {
  address: 'Al Olaya, Riyadh, SA',
  replaceFee: '100',
  shippingFee: '100',
  totalFee: '200',
  balance: '5,200.40',
};

const IssueNewCardConfirmDetailsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const route = useRoute<RouteProps>();

  const {
    currentCard: { cardHeaderText, name },
  } = route.params;

  const localizationText = useLocalization();

  const veriyOTPSheetRef = useRef<bottomSheetModal>(null);
  const otpVerificationRef = useRef<bottomSheetModal>(null);
  const helpCenterRef = useRef<bottomSheetModal>(null);
  const termsAndConditionSheetRef = useRef<TermsAndConditionsRefTypes>(null);
  const openBottomSheet = useRef<bottomSheetModal>(null);
  const styles = issueNewCardConfirmDetailsStyles(colors);
  const addressInfoSheetRef = useRef<AddressInfoRefTypes>(null);

  const onCloseBottomSheetOTP = () => {
    veriyOTPSheetRef.current?.close();
  };

  const onCloseBottomSheetPIN = () => {
    openBottomSheet.current?.close();
  };

  const onOpenBottomSheetOTP = () => {
    veriyOTPSheetRef.current?.present();
  };

  const onOpenBottomSheetPIN = () => {
    openBottomSheet.current?.present();
  };

  const onSuccessPin = () => {
    onCloseBottomSheetPIN();
    onOpenBottomSheetOTP();
  };

  const onSuccessOTP = () => {
    onCloseBottomSheetOTP();
    navigate(ScreenNames.ISSUE_PHYSICAL_CARD_SUCCESS);
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  const renderToast = () => {
    showToast({
      title: localizationText.COMMON.TERMS_AND_CONDITIONS_VALIDATION,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainerStyle,
    });
  };

  const onConfirm = () => {
    if (checkTermsAndConditions) {
      onOpenBottomSheetPIN();
    } else {
      renderToast();
    }
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title="PHYSICAL_CARD.ISSUE_A_NEW_CARD" backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance
          showRemainingAmount
          availableBalance="20,000"
          balance={DUMMY_DATA.balance}
          onPressTopup={() => {}}
        />
        <IPayView style={styles.contentContainer}>
          <IPayScrollView showsVerticalScrollIndicator={false}>
            <IPayView style={styles.contentTopMargin}>
              <IPayFootnoteText text="CARDS.CARD_DETAILS" color={colors.natural.natural500} />
              <IPayList
                testID="ipay-list-card-holders-name"
                title="REPLACE_CARD.HOLDERS_NAME"
                isShowDetail
                rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={name} />}
              />
              <IPayList
                testID="ipay-list-card-type"
                title="CARDS.CARD_TYPE"
                rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={cardHeaderText} />}
              />

              <IPayFootnoteText
                text="REPLACE_CARD.SHIPPING_ADDRESS"
                color={colors.natural.natural500}
                style={styles.footNoteTextStyle}
              />
              <IPayList
                testID="ipay-list-national-address"
                title="PROFILE.NATIONAL_ADDRESS"
                rightText={
                  <IPayPressable
                    onPress={() => addressInfoSheetRef.current?.showAddressInfoSheet()}
                    style={styles.addressStyle}
                  >
                    <IPayFootnoteText color={colors.primary.primary800} regular text={DUMMY_DATA.address} />
                    <IPayIcon icon={icons.infoIcon} size={16} color={colors.primary.primary500} />
                  </IPayPressable>
                }
              />
              <IPayFootnoteText
                text="CARD_OPTIONS.CARD_FEE"
                color={colors.natural.natural500}
                style={styles.footNoteTextStyle}
              />
              <IPayList
                testID="ipay-list-issuance-fee"
                title="TOPUP_CONFIRMATION.ISSUANCE_FEE"
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={`${DUMMY_DATA.replaceFee} ${localizationText.COMMON.SAR}`}
                  />
                }
              />

              <IPayList
                testID="ipay-list-shipping-fee"
                title="REPLACE_CARD.SHIPPING_FEE"
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={`${DUMMY_DATA.shippingFee} ${localizationText.COMMON.SAR}`}
                  />
                }
              />
            </IPayView>
          </IPayScrollView>
          <IPayView style={styles.bottomContainer}>
            <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer}>
              <IPayView style={styles.termsChildContainer}>
                <IPayCheckbox onPress={toggleTermsAndConditions} isCheck={checkTermsAndConditions} />
                <IPayFootnoteText style={styles.termText} text="COMMON.TERMS_AND_CONDITIONS_TEXT" />
                <IPayIcon icon={icons.infoIcon} size={20} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>
            <IPayList
              testID="ipay-list-total-fee"
              title="REPLACE_CARD.TOTAL_FEE"
              rightText={
                <IPaySubHeadlineText
                  color={colors.primary.primary800}
                  regular
                  text={`${DUMMY_DATA.totalFee} ${localizationText.COMMON.SAR}`}
                />
              }
            />
            <IPayButton
              onPress={onConfirm}
              // large
              btnStyle={styles.button}
              btnIconsDisabled
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.CONFIRM"
            />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayAddressInfoSheet ref={addressInfoSheetRef} />
      <IPayBottomSheet
        testID="ipay-bottom-sheet-pin-code"
        heading="CHANGE_PIN.CHANGE_PIN_CODE"
        enablePanDownToClose
        simpleHeader
        cancelBnt
        customSnapPoint={['1%', '99%']}
        onCloseBottomSheet={onCloseBottomSheetPIN}
        ref={openBottomSheet}
      >
        <IPayCreateCardPin onSuccess={onSuccessPin} />
      </IPayBottomSheet>
      <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
      <IPayBottomSheet
        testID="ipay-bottom-physical-card"
        heading="REPLACE_CARD.REPLACE_PHYSICAL_CARD"
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '99%']}
        onCloseBottomSheet={onCloseBottomSheetOTP}
        ref={veriyOTPSheetRef}
      >
        <IPayOtpVerification
          setOtpError={setOtpError}
          ref={otpVerificationRef}
          onPressConfirm={onSuccessOTP}
          mobileNumber="0511110302"
          setOtp={setOtp}
          showHelp
          handleOnPressHelp={handleOnPressHelp}
          otp={otp}
          otpError={otpError}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        testID="ipay-bottom-help-center"
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

export default IssueNewCardConfirmDetailsScreen;

import React, { useRef, useState } from 'react';
import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import { IPaySafeAreaView } from '@components/templates';
import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute, RouteProp } from '@react-navigation/native';
import icons from '@app/assets/icons';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import { OTPVerificationRefTypes, TermsAndConditionsRefTypes, RouteParams } from './print-card-confirmation.interface';
import printCardConfirmationStyles from './print-card-confirmation.style';

const DUMMY_DATA = {
  address: 'Al Olaya, Riyadh, SA',
  replaceFee: '100',
  shippingFee: '100',
  totalFee: '200',
  balance: '5,200.40',
};

const PrintCardConfirmationScreen: React.FC = () => {
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const route = useRoute<RouteProps>();

  const {
    currentCard: { cardHeaderText, name },
  } = route.params;

  const localizationText = useLocalization();

  const veriyOTPSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<OTPVerificationRefTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const termsAndConditionSheetRef = useRef<TermsAndConditionsRefTypes>(null);

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
      title: localizationText.COMMON.TERMS_AND_CONDITIONS_VALIDATION,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainerStyle,
    });
  };

  const onPressConfirm = () => {
    if (checkTermsAndConditions) {
      veriyOTPSheetRef.current?.present();
    } else {
      renderToast();
    }
  };

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);

  const onNavigateToSuccess = () => {
    onCloseBottomSheet();
    navigate(ScreenNames.REPLACE_CARD_SUCCESS);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.CARD_OPTIONS.PRINT_CARD} backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance
          showRemainingAmount
          availableBalance="20,000"
          balance={DUMMY_DATA.balance}
          onPressTopup={() => {}}
        />
        <IPayView style={styles.contentContainer}>
          <IPayFootnoteText text={localizationText.CARDS.CARD_DETAILS} color={colors.natural.natural500} />
          <IPayList
            title={localizationText.REPLACE_CARD.HOLDERS_NAME}
            isShowDetail
            rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={name} />}
          />
          <IPayList
            title={localizationText.CARDS.CARD_TYPE}
            rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={cardHeaderText} />}
          />

          <IPayFootnoteText
            text={localizationText.REPLACE_CARD.SHIPPING_ADDRESS}
            color={colors.natural.natural500}
            style={styles.footNoteTextStyle}
          />
          <IPayList
            title={localizationText.PROFILE.NATIONAL_ADDRESS}
            rightText={
              <IPayView style={styles.addressStyle}>
                <IPayFootnoteText color={colors.primary.primary800} regular text={DUMMY_DATA.address} />
                <IPayIcon icon={icons.info_circle2} size={16} color={colors.primary.primary500} />
              </IPayView>
            }
          />
          <IPayFootnoteText
            text={localizationText.CARD_OPTIONS.CARD_FEE}
            color={colors.natural.natural500}
            style={styles.footNoteTextStyle}
          />
          <IPayList
            title={localizationText.REPLACE_CARD.SHIPPING_FEE}
            rightText={
              <IPaySubHeadlineText
                color={colors.primary.primary800}
                regular
                text={`${DUMMY_DATA.replaceFee} ${localizationText.COMMON.SAR}`}
              />
            }
          />
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
      <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
      <IPayBottomSheet
        noGradient
        heading={localizationText.CARD_OPTIONS.PHYSICAL_CARD}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '99%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={veriyOTPSheetRef}
      >
        <OtpVerificationComponent
          onConfirmPress={onNavigateToSuccess}
          ref={otpVerificationRef}
          onPressHelp={handleOnPressHelp}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        noGradient
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
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
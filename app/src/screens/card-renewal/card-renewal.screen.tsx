import React, { useRef, useState } from 'react';

import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import constants from '@app/constants/constants';
import IPayCardBanner from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';

import { ViewStyle } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { buttonVariants } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';
import { IPayTermsAndConditions, IPayBottomSheet } from '@app/components/organism';
import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import {
  TermsAndConditionsRefTypes,
  VeriyOTPSheetRefTypes,
  HelpCenterRefTypes,
  OTPVerificationRefTypes,
} from './card-renewal.screen.interface';

import cardRenewalStyles from './card-renewal.style';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';

const DUMMY_DATA = {
  balance: '5,200.40',
  cardRenewalFee: '100',
};

const CardRenewalScreen: React.FC = () => {
  const { colors } = useTheme();

  const localizationText = useLocalization();
  const termsAndConditionSheetRef = useRef<TermsAndConditionsRefTypes>(null);
  const veriyOTPSheetRef = useRef<VeriyOTPSheetRefTypes>(null);
  const otpVerificationRef = useRef<OTPVerificationRefTypes>(null);
  const helpCenterRef = useRef<HelpCenterRefTypes>(null);

  const styles = cardRenewalStyles(colors);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    veriyOTPSheetRef.current?.close();
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onPressConfirm = () => {
    veriyOTPSheetRef.current?.present();
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.CARD_RENEWAL.CARD_RENEWAL} backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance balance={DUMMY_DATA.balance} onPressTopup={() => {}} />
        <IPayView style={styles.contentContainer}>
          <IPayView style={{ gap: verticalScale(20) }}>
            <IPayCardBanner
              containerStyle={styles.zeroMargin as ViewStyle}
              cardType={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE}
              cardTypeName={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
              carHolderName={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
              cardLastFourDigit={constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}
            />
            <IPayView
              style={{
                gap: verticalScale(12),
              }}
            >
              <IPayList
                containerStyle={styles.zeroMargin as ViewStyle}
                icon={<IPayView />}
                title={localizationText.CARD_RENEWAL.HOLDER_NAME}
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
                  />
                }
              />
              <IPayList
                containerStyle={styles.zeroMargin as ViewStyle}
                icon={<IPayView />}
                title={localizationText.CARD_RENEWAL.CARD_TYPE}
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
                  />
                }
              />
            </IPayView>
            <IPayList
              containerStyle={styles.zeroMargin as ViewStyle}
              icon={<IPayView />}
              title={localizationText.CARD_RENEWAL.RENEWAL_FEE}
              rightText={
                <IPaySubHeadlineText
                  color={colors.primary.primary800}
                  regular
                  text={`${DUMMY_DATA.cardRenewalFee} ${localizationText.COMMON.SAR}`}
                />
              }
            />
          </IPayView>

          <IPayView style={styles.bottomContainer}>
            <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer}>
              <IPayView style={styles.termsChildContainer}>
                <IPayCheckbox onPress={toggleTermsAndConditions} isCheck={checkTermsAndConditions} />
                <IPayFootnoteText style={styles.termText} text={localizationText.COMMON.TERMS_AND_CONDITIONS_TEXT} />
                <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
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
        heading={localizationText.CARD_RENEWAL.CARD_RENEWAL}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={veriyOTPSheetRef}
      >
        <OtpVerificationComponent
          onConfirmPress={() => {
            // TODO: move to succes screen
          }}
          ref={otpVerificationRef}
          onPressHelp={handleOnPressHelp}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '100%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default CardRenewalScreen;

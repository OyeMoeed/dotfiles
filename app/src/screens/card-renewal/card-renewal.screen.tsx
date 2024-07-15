import React, { useRef, useState } from 'react';

import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import constants from '@app/constants/constants';
import IPayCardBanner from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';

import { ViewStyle } from 'react-native';
import { buttonVariants } from '@app/utilities/enums.util';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
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
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { TermsAndConditionsRefTypes, OTPVerificationRefTypes } from './card-renewal.screen.interface';

import cardRenewalStyles from './card-renewal.style';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';

const DUMMY_DATA = {
  balance: '5,200.40',
  cardRenewalFee: '100',
};

const CardRenewalScreen: React.FC = () => {
  const { colors } = useTheme();
  const { showToast } = useToastContext();

  const localizationText = useLocalization();
  const termsAndConditionSheetRef = useRef<TermsAndConditionsRefTypes>(null);
  const veriyOTPSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<OTPVerificationRefTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);

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

  const renderToast = () => {
    showToast({
      title: localizationText.COMMON.TERMS_AND_CONDITIONS,
      subTitle: localizationText.COMMON.TERMS_AND_CONDITIONS_VALIDATION,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const onPressConfirm = () => {
    if (checkTermsAndConditions) {
      veriyOTPSheetRef.current?.present();
    } else {
      renderToast();
    }
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.CARD_RENEWAL.CARD_RENEWAL} backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance balance={DUMMY_DATA.balance} onPressTopup={() => {}} />
        <IPayView style={styles.contentContainer}>
          <IPayView style={styles.contentContainerGap}>
            <IPayCardBanner
              containerStyle={styles.zeroMargin as ViewStyle}
              cardType={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE}
              cardTypeName={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
              carHolderName={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
              cardLastFourDigit={constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}
            />
            <IPayView style={styles.ipayListGap}>
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
            // TODO: move to success screen
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

import React, { useRef, useState } from 'react';

import icons from '@app/assets/icons';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayCardBanner from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import constants from '@app/constants/constants';
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
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { buttonVariants, CardTypes } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { IPaySafeAreaView } from '@components/templates';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { OTPVerificationRefTypes, RouteParams, TermsAndConditionsRefTypes } from './card-renewal.screen.interface';

import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import cardRenewalStyles from './card-renewal.style';

const DUMMY_DATA = {
  balance: '5,200.40',
  cardRenewalFee: '100',
  totalBalance: '10,000',
};

const CardRenewalScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const {
    currentCard: { cardType, cardHeaderText, name },
  } = route?.params as unknown as { currentCard: { cardType: CardTypes; cardHeaderText: ''; name: '' } };

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
      title: t('COMMON.TERMS_AND_CONDITIONS'),
      subTitle: t('COMMON.TERMS_AND_CONDITIONS_VALIDATION'),
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
      <IPayHeader title="CARD_RENEWAL.CARD_RENEWAL" backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance
          balance={DUMMY_DATA.balance}
          showRemainingAmount
          availableBalance={DUMMY_DATA.totalBalance}
          onPressTopup={() => {}}
        />
        <IPayView style={styles.contentContainer}>
          <IPayView style={styles.contentContainerGap}>
            <IPayCardBanner
              containerStyle={styles.zeroMargin}
              cardType={cardType}
              cardTypeName={cardHeaderText}
              carHolderName={name}
              cardLastFourDigit={constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}
            />
            <IPayView style={styles.ipayListGap}>
              <IPayList
                containerStyle={styles.zeroMargin}
                icon={<IPayView />}
                title="CARD_RENEWAL.HOLDER_NAME"
                rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={name} />}
              />
              <IPayList
                containerStyle={styles.zeroMargin}
                icon={<IPayView />}
                title="CARD_RENEWAL.CARD_TYPE"
                rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={cardHeaderText} />}
              />
            </IPayView>
            <IPayList
              containerStyle={styles.zeroMargin}
              icon={<IPayView />}
              title="CARD_RENEWAL.RENEWAL_FEE"
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
                <IPayFootnoteText style={styles.termText} text="COMMON.TERMS_AND_CONDITIONS_TEXT" />
                <IPayIcon icon={icons.infoIcon} size={20} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>
            <IPayButton
              onPress={onPressConfirm}
              large
              btnIconsDisabled
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.CONFIRM"
            />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
      <IPayBottomSheet
        heading="CARD_RENEWAL.CARD_RENEWAL"
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '99%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={veriyOTPSheetRef}
      >
        <OtpVerificationComponent
          onConfirmPress={() => {
            onCloseBottomSheet();
            navigate(ScreenNames.CARD_RENEWAL_SUCCESS);
          }}
          ref={otpVerificationRef}
          onPressHelp={handleOnPressHelp}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
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

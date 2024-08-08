import React, { useRef, useState } from 'react';
import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import { IPaySafeAreaView } from '@components/templates';
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
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import { RouteParams, TermsAndConditionsRefTypes } from './issue-new-card-confirm-details.interface';
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
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.REPLACE_CARD.REPLACE_PHYSICAL_CARD} backBtn applyFlex />
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
                title={localizationText.TOPUP_CONFIRMATION.ISSUANCE_FEE}
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={`${DUMMY_DATA.replaceFee} ${localizationText.COMMON.SAR}`}
                  />
                }
              />

              <IPayList
                title={localizationText.REPLACE_CARD.SHIPPING_FEE}
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={`${DUMMY_DATA.shippingFee} ${localizationText.COMMON.SAR}`}
                  />
                }
              />

              <IPayView style={styles.bottomContainer}>
                <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer}>
                  <IPayView style={styles.termsChildContainer}>
                    <IPayCheckbox onPress={toggleTermsAndConditions} isCheck={checkTermsAndConditions} />
                    <IPayFootnoteText
                      style={styles.termText}
                      text={localizationText.COMMON.TERMS_AND_CONDITIONS_TEXT}
                    />
                    <IPayIcon icon={icons.infoIcon} size={20} color={colors.primary.primary500} />
                  </IPayView>
                </IPayPressable>
                <IPayList
                  title={localizationText.REPLACE_CARD.TOTAL_FEE}
                  rightText={
                    <IPaySubHeadlineText
                      color={colors.primary.primary800}
                      regular
                      text={`${DUMMY_DATA.totalFee} ${localizationText.COMMON.SAR}`}
                    />
                  }
                />
                <IPayButton
                  onPress={onOpenBottomSheetPIN}
                  large
                  btnIconsDisabled
                  btnType={buttonVariants.PRIMARY}
                  btnText={localizationText.COMMON.CONFIRM}
                />
              </IPayView>
            </IPayView>
          </IPayScrollView>
        </IPayView>
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.CHANGE_PIN.CHANGE_PIN_CODE}
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
        heading={localizationText.REPLACE_CARD.REPLACE_PHYSICAL_CARD}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '99%']}
        onCloseBottomSheet={onCloseBottomSheetOTP}
        ref={veriyOTPSheetRef}
      >
        <OtpVerificationComponent
          onConfirmPress={onSuccessOTP}
          ref={otpVerificationRef}
          onPressHelp={handleOnPressHelp}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
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

export default IssueNewCardConfirmDetailsScreen;

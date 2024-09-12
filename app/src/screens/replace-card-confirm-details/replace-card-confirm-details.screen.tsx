import React, { useRef, useState } from 'react';

import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import { IPaySafeAreaView } from '@components/templates';

import icons from '@app/assets/icons';
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
import IPayAddressInfoSheet from '@app/components/organism/ipay-address-info-sheet/ipay-address-info-sheet.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import { AddressInfoRefTypes } from '../issue-new-card-confirm-details/issue-new-card-confirm-details.interface';
import { OTPVerificationRefTypes, RouteParams } from './replace-card-confirm-details.interface';
import replaceCardStyles from './replace-card-confirm-details.style';

const DUMMY_DATA = {
  address: 'Al Olaya, Riyadh',
  replaceFee: '100',
  shippingFee: '100',
  totalFee: '200',
  balance: '5,200.40',
};

const ReplaceCardConfirmDetailsScreen: React.FC = () => {
  const { colors } = useTheme();

  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const [showTermsAndConditionsSheet, setShowTermsAndConditionsSheet] = useState(false);
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const route = useRoute<RouteProps>();

  const {
    currentCard: { cardHeaderText, name },
  } = route.params;

  const localizationText = useLocalization();

  const veriyOTPSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<OTPVerificationRefTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);

  const styles = replaceCardStyles(colors);

  const addressInfoSheetRef = useRef<AddressInfoRefTypes>(null);
  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    veriyOTPSheetRef.current?.close();
  };

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);
  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onPressTermsAndConditions = () => {
    setShowTermsAndConditionsSheet(true);
  };
  const onPressConfirm = () => {
    veriyOTPSheetRef.current?.present();
  };

  const onNavigateToSuccess = () => {
    onCloseBottomSheet();
    navigate(ScreenNames.REPLACE_CARD_SUCCESS);
  };

  const onClose = () => {
    addressInfoSheetRef.current?.showAddressInfoSheet();
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
          <IPayScrollView showsVerticalScrollIndicator={false}>
            <IPayView style={styles.contentTopMargin}>
              <IPayFootnoteText
                text={localizationText.CARDS.CARD_DETAILS}
                color={colors.natural.natural500}
                style={styles.header}
              />
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
                title={localizationText.REPLACE_CARD.ADDRESS}
                rightText={
                  <IPayPressable onPress={onClose} style={styles.addressStyle}>
                    <IPayFootnoteText color={colors.primary.primary800} regular text={DUMMY_DATA.address} />
                    <IPayIcon icon={icons.infoIcon} size={16} color={colors.primary.primary500} />
                  </IPayPressable>
                }
              />
              <IPayFootnoteText
                text={localizationText.CARD_OPTIONS.CARD_FEE}
                color={colors.natural.natural500}
                style={styles.footNoteTextStyle}
              />
              <IPayList
                title={localizationText.REPLACE_CARD.REPLACEMENT_FEE}
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
            </IPayView>
          </IPayScrollView>
          <IPayView style={styles.bottomContainer}>
            <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer}>
              <IPayView style={styles.termsChildContainer}>
                <IPayCheckbox onPress={toggleTermsAndConditions} isCheck={checkTermsAndConditions} />
                <IPayFootnoteText style={styles.termText} text={localizationText.COMMON.TERMS_AND_CONDITIONS_TEXT} />
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
              onPress={onPressConfirm}
              btnStyle={styles.btn}
              btnIconsDisabled
              btnType={buttonVariants.PRIMARY}
              btnText={localizationText.COMMON.CONFIRM}
            />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.REPLACE_CARD.REPLACE_PHYSICAL_CARD}
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
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '100%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>
      <IPayAddressInfoSheet ref={addressInfoSheetRef} />
      <IPayTermsAndConditions
        showTermsAndConditions={showTermsAndConditionsSheet}
        setShowTermsAndConditions={setShowTermsAndConditionsSheet}
      />
    </IPaySafeAreaView>
  );
};

export default ReplaceCardConfirmDetailsScreen;

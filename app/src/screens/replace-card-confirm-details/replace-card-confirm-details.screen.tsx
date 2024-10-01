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
import { IPayBottomSheet } from '@app/components/organism';
import IPayAddressInfoSheet from '@app/components/organism/ipay-address-info-sheet/ipay-address-info-sheet.component';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { setTermsConditionsVisibility } from '@app/store/slices/bottom-sheets-slice';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import IssueCardPinCreationScreen from '../issue-card-pin-creation/issue-card-pin-creation.screens';
import { AddressInfoRefTypes } from '../issue-new-card-confirm-details/issue-new-card-confirm-details.interface';
import { OTPVerificationRefTypes, RouteParams } from './replace-card-confirm-details.interface';
import replaceCardStyles from './replace-card-confirm-details.style';

const ReplaceCardConfirmDetailsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);

  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const route = useRoute<RouteProps>();

  const {
    availableBalance,
    limitsDetails: { monthlyRemainingOutgoingAmount, monthlyOutgoingLimit },
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const {
    currentCard: { cardHeaderText, name },
    issuanceDetails,
  } = route.params;

  const address = useTypedSelector((state) => state.walletInfoReducer.walletInfo.userContactInfo.address);

  const calculateFee = (amount: string | number): number => parseFloat(amount as string) || 0;

  const replacementFee =
    calculateFee(issuanceDetails?.fees?.feeAmount) +
    calculateFee(issuanceDetails?.fees?.vatAmount) +
    calculateFee(issuanceDetails?.fees?.bankFeeAmount) +
    calculateFee(issuanceDetails?.fees?.bankVatAmount);

  const deliveryFee =
    calculateFee(issuanceDetails?.fees?.deliveryFeeAmount) + calculateFee(issuanceDetails?.fees?.deliveryVatAmount);

  const totalFee = replacementFee + deliveryFee;

  const formattedTotalFee = totalFee.toFixed(2);

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
  const dispatch = useDispatch();
  const onPressTermsAndConditions = () => {
    dispatch(
      setTermsConditionsVisibility({
        isVisible: true,
      }),
    );
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
      <IPayHeader title="CARD_OPTIONS.PRINT_CARD" backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance
          accountBalanceTextStyle={styles.darkStyle}
          currentBalanceTextStyle={styles.darkStyle}
          currencyTextStyle={styles.darkStyle}
          remainingAmountTextStyle={styles.remainingText}
          currentAvailableTextStyle={styles.currencyTextStyle}
          showRemainingAmount
          onPressTopup={() => {}}
          balance={availableBalance}
          gradientWidth={`${getBalancePercentage(Number(monthlyOutgoingLimit), Number(monthlyRemainingOutgoingAmount))}%`}
          monthlyIncomingLimit={monthlyRemainingOutgoingAmount}
          availableBalance={monthlyOutgoingLimit}
        />
        <IPayView style={styles.contentContainer}>
          <IPayScrollView showsVerticalScrollIndicator={false}>
            <IPayView style={styles.contentTopMargin}>
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
                title="REPLACE_CARD.ADDRESS"
                rightText={
                  <IPayPressable onPress={onClose} style={styles.addressStyle}>
                    <IPayFootnoteText color={colors.primary.primary800} regular text={address} />
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
                title="REPLACE_CARD.REPLACEMENT_FEE"
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={`${replacementFee.toFixed(2)} ${t('COMMON.SAR')}`}
                  />
                }
              />

              <IPayList
                title="REPLACE_CARD.SHIPPING_FEE"
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={`${deliveryFee.toFixed(2)} ${t('COMMON.SAR')}`}
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
              title="REPLACE_CARD.TOTAL_FEE"
              rightText={
                <IPaySubHeadlineText
                  color={colors.primary.primary800}
                  regular
                  text={`${formattedTotalFee} ${t('COMMON.SAR')}`}
                />
              }
            />
            <IPayButton
              onPress={onPressConfirm}
              btnStyle={styles.btn}
              btnIconsDisabled
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.CONFIRM"
            />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayBottomSheet
        heading="REPLACE_CARD.REPLACE_PHYSICAL_CARD"
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '99%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={veriyOTPSheetRef}
      >
        <IssueCardPinCreationScreen
          onSuccess={onNavigateToSuccess}
          handleOnPressHelp={handleOnPressHelp}
          issuanceDetails={issuanceDetails}
          isPhysicalCard
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
      <IPayAddressInfoSheet ref={addressInfoSheetRef} />
    </IPaySafeAreaView>
  );
};

export default ReplaceCardConfirmDetailsScreen;

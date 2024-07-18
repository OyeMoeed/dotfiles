import React, { useRef } from 'react';

import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import { IPaySafeAreaView } from '@components/templates';

import { IPayFootnoteText, IPayScrollView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPayBottomSheet } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import { OTPVerificationRefTypes } from './replace-card-confirm-details.interface';
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

  const localizationText = useLocalization();

  const veriyOTPSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<OTPVerificationRefTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);

  const styles = replaceCardStyles(colors);

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
      <IPayHeader title={localizationText.REPLACE_CARD.REPLACE_PHYSICAL_CARD} backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance balance={DUMMY_DATA.balance} onPressTopup={() => {}} />
        <IPayView style={styles.contentContainer}>
          <IPayScrollView showsVerticalScrollIndicator={false}>
            <IPayView>
              <IPayFootnoteText text={localizationText.CARDS.CARD_DETAILS} color={colors.natural.natural500} />
              <IPayList
                title={localizationText.REPLACE_CARD.HOLDERS_NAME}
                isShowDetail
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
                  />
                }
              />
              <IPayList
                title={localizationText.CARDS.CARD_TYPE}
                rightText={
                  <IPaySubHeadlineText
                    color={colors.primary.primary800}
                    regular
                    text={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
                  />
                }
              />

              <IPayFootnoteText
                text={localizationText.REPLACE_CARD.SHIPPING_ADDRESS}
                color={colors.natural.natural500}
                style={styles.footNoteTextStyle}
              />
              <IPayList
                title={localizationText.REPLACE_CARD.ADDRESS}
                rightText={<IPaySubHeadlineText color={colors.primary.primary800} regular text={DUMMY_DATA.address} />}
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

              <IPayView style={styles.bottomContainer}>
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
        heading={localizationText.REPLACE_CARD.REPLACE_PHYSICAL_CARD}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={veriyOTPSheetRef}
      >
        <OtpVerificationComponent
          onConfirmPress={() => {
            onCloseBottomSheet()
            navigate(ScreenNames.REPLACE_CARD_SUCCESS);
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

export default ReplaceCardConfirmDetailsScreen;

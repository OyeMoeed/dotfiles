import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import { BeneficiaryDetailsProps } from './transfer-confirmation.interface';
import transferConfirmationStyles from './transfer-confirmation.style';

const TransferConfirmation: React.FC = () => {
  const { colors } = useTheme();
  const styles = transferConfirmationStyles(colors);
  const localizationText = useLocalization();
  const otpBottomSheetRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { mobileNumber } = walletInfo;
  const footerParentViewGradient = [colors.primary.primary50, colors.secondary.secondary50];
  const footerGradientColors = [colors.primary.primary100, colors.secondary.secondary100];
  const totalAmount = `3020 ${localizationText.COMMON.SAR}`;
  const beneficiaryData = constants.BENEFICIARY_DETAILS;
  const transferInfoData = constants.BANK_DETAILS;
  const vatTax = `${localizationText.LOCAL_TRANSFER.VAT} (15%)`;
  const vat = `${10} ${localizationText.COMMON.SAR}`;
  const fees = `${10} ${localizationText.COMMON.SAR}`;
  const iqamaId = '324234234';

  const onCloseBottomSheet = () => {
    otpBottomSheetRef?.current?.close();
  };

  const onPressTransfer = () => {
    otpBottomSheetRef?.current?.present();
  };

  const onConfirmPressOtp = () => {
    onCloseBottomSheet();
  };

  const onPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const renderBenificaryDetails = ({ item }: BeneficiaryDetailsProps) => (
    <IPayView style={styles.smallerTabView}>
      <IPayFootnoteText text={item?.title} color={colors.natural.natural900} />
      <IPayView style={styles.subTitleView}>
        <IPayFootnoteText text={item?.subTitle} color={colors.primary.primary800} />
        {item?.icon && <IPayImage image={item?.icon} style={styles.fastCovertionIcon} />}
      </IPayView>
    </IPayView>
  );
  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.LOCAL_TRANSFER.TRANSFER_CONFIRMATION} />
      <IPayScrollView style={styles.container}>
        <IPayLinearGradientView gradientColors={colors.bottomsheetGradient} style={styles.beneficiaryDetailsView}>
          <IPayView style={styles.beneficiaryBankDetailsView}>
            <IPayImage image={transferInfoData?.icon} style={styles.bankLogo} />
            <IPayView style={styles.bankDetailsView}>
              <IPayView style={styles.bankTitleView}>
                <IPayFootnoteText regular={false} text={transferInfoData?.title} color={colors.natural.natural900} />
                <IPayCaption2Text regular text={` | ${transferInfoData?.bankName}`} color={colors.natural.natural900} />
              </IPayView>
              <IPayCaption1Text text={transferInfoData?.accountNumber} color={colors.natural.natural500} />
            </IPayView>
          </IPayView>
          <IPayFlatlist
            data={beneficiaryData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderBenificaryDetails}
            itemSeparatorStyle={StyleSheet.flatten(styles.itemSeparatorStyle)}
          />
          <IPayView style={styles.taxView}>
            <IPayView style={styles.smallerTabView}>
              <IPayFootnoteText text={vatTax} color={colors.natural.natural900} />
              <IPayFootnoteText text={vat} color={colors.primary.primary800} />
            </IPayView>

            <IPayView style={[styles.smallerTabView, styles.feesView]}>
              <IPayFootnoteText text={localizationText.LOCAL_TRANSFER.FEES} color={colors.natural.natural900} />
              <IPayFootnoteText text={fees} color={colors.primary.primary800} />
            </IPayView>
          </IPayView>
        </IPayLinearGradientView>
      </IPayScrollView>

      <IPayView style={styles.bottomChild}>
        <IPayLinearGradientView gradientColors={footerParentViewGradient} style={styles.bottomView}>
          <IPayLinearGradientView gradientColors={footerGradientColors} style={styles.footerView}>
            <IPayView style={styles.transferInfoView}>
              <IPayIcon icon={icons.clock_11} size={24} color={colors.primary.primary900} />
              <IPayFootnoteText
                text={localizationText.LOCAL_TRANSFER.THE_AMOUNT_WILL_BE_TRANSFERRED_DURING_OFFICIAL_HOURS}
                style={styles.transferAmountDetailsText}
              />
            </IPayView>
            <IPayView style={styles.totalAmountView}>
              <IPayView style={styles.smallerTabView}>
                <IPayFootnoteText
                  text={localizationText.LOCAL_TRANSFER.TOTAL_AMOUNT}
                  color={colors.natural.natural900}
                />
                <IPayFootnoteText text={totalAmount} color={colors.primary.primary800} />
              </IPayView>
            </IPayView>
            <IPayButton
              onPress={onPressTransfer}
              btnType={buttonVariants.PRIMARY}
              large
              btnIconsDisabled
              btnText={localizationText.COMMON.TRANSFER}
            />
          </IPayLinearGradientView>
        </IPayLinearGradientView>
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.LOCAL_TRANSFER.TRANSFER}
        enablePanDownToClose
        simpleBar
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={otpBottomSheetRef}
        bold
        cancelBnt
      >
        <OtpVerificationComponent
          onConfirmPress={onConfirmPressOtp}
          onPressHelp={onPressHelp}
          iqamaId={iqamaId}
          phoneNumber={mobileNumber}
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

export default TransferConfirmation;

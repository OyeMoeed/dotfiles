import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { buttonVariants, ToastTypes } from '@app/utilities/enums.util';
import checkImage from '@app/utilities/image-helper.util';
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
  const { showToast } = useToastContext();
  const otpBottomSheetRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { userContactInfo } = walletInfo;
  const { mobileNumber } = userContactInfo;
  const footerGradientColors = [colors.primary.primary100, colors.secondary.secondary100];
  const totalAmount = `3020 ${localizationText.COMMON.SAR}`;
  const beneficiaryData = constants.BENEFICIARY_DETAILS;
  const transferInfoData = constants.BANK_DETAILS;
  const vatTax = `${localizationText.LOCAL_TRANSFER.VAT} (15%)`;
  const vat = `${10} ${localizationText.COMMON.SAR}`;
  const fees = `${10} ${localizationText.COMMON.SAR}`;
  const iqamaId = '324234234';

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title,
        subTitle,
        toastType,
        isShowRightIcon: false,
        leftIcon: icon || <IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };
  const onPressCopy = (refNo: string) => {
    copyText(refNo);
    renderToast({ title: localizationText.TOP_UP.REF_NUMBER_COPIED, toastType: ToastTypes.INFORMATION });
  };

  const onCloseBottomSheet = () => {
    otpBottomSheetRef?.current?.close();
  };

  const onPressTransfer = () => {
    otpBottomSheetRef?.current?.present();
  };

  const onConfirmPressOtp = () => {
    onCloseBottomSheet();
    navigate(ScreenNames.TRANSFER_SUCCESS);
  };

  const onPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const renderBenificaryDetails = ({ item }: BeneficiaryDetailsProps) => {
    const { title, subTitle, icon, currency } = item;
    const isImage = checkImage(icon);
    return (
      <IPayView style={styles.dataCardView}>
        <IPayFootnoteText regular text={title} color={colors.natural.natural900} />
        <IPayView style={styles.transactionDetailsView}>
          <IPayView style={styles.detailsView}>
            <IPaySubHeadlineText
              regular
              text={subTitle + (currency ? ` ${currency}` : '')}
              color={colors.primary.primary800}
              numberOfLines={1}
              style={[styles.subTitle, subTitle.length > 20 && styles.condtionalWidthSubtitle]}
            />
            {icon &&
              (isImage ? (
                <IPayImage image={item.icon} style={styles.fastCovertionIcon} />
              ) : (
                <IPayPressable style={styles.icon} onPress={() => onPressCopy(subTitle)}>
                  <IPayIcon icon={item.icon} size={18} color={colors.primary.primary500} />
                </IPayPressable>
              ))}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

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
          <IPayView style={styles.listView}>
            <IPayFlatlist
              data={beneficiaryData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderBenificaryDetails}
              itemSeparatorStyle={StyleSheet.flatten(styles.itemSeparatorStyle)}
            />
          </IPayView>
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
        <IPayView style={styles.bottomView}>
          <IPayLinearGradientView gradientColors={footerGradientColors} style={styles.footerView}>
            <IPayView style={styles.transferInfoView}>
              <IPayIcon icon={icons.clock_circle} size={24} color={colors.primary.primary900} />
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
              btnText={localizationText.COMMON.TRANSFER_TEXT}
            />
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.LOCAL_TRANSFER.TRANSFER}
        enablePanDownToClose
        simpleBar
        customSnapPoint={['1%', '99%']}
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

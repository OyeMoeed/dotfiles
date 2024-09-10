import icons from '@app/assets/icons';
import images from '@app/assets/images';
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
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { LocalTransferConfirmPayloadTypes } from '@app/network/services/local-transfer/local-transfer-confirm/local-transfer-confirm.interface';
import localTransferConfirm from '@app/network/services/local-transfer/local-transfer-confirm/local-transfer-confirm.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { APIResponseType, buttonVariants, toastTypes } from '@app/utilities/enums.util';
import checkImage from '@app/utilities/image-helper.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import { BeneficiaryDetailsProps, TransactionDetails } from './transfer-confirmation.interface';
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
  const footerParentViewGradient = [colors.primary.primary50, colors.secondary.secondary50];
  const footerGradientColors = [colors.primary.primary100, colors.secondary.secondary100];
  const [beneficiaryData, setBeneficiaryData] = useState();
  const transferInfoData = constants.BANK_DETAILS;
  const vatTax = `${localizationText.LOCAL_TRANSFER.VAT} (15%)`;

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoadingConfirm, setIsLoadingConfrim] = useState(false);
  const [apiError, setAPIError] = useState<string>('');

  type RouteProps = RouteProp<{ params: TransactionDetails }, 'params'>;
  const route = useRoute<RouteProps>();

  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const {
    amount,
    beneficiaryNickName,
    transferPurpose,
    instantTransferType,
    note,
    otpRef,
    feesAmount,
    vatAmount,
    totalAmount,
    authentication,
  } = route.params;

  useEffect(() => {
    const beneficiaryDataArray = [
      { title: localizationText.TRANSFER_SUMMARY.AMOUNT, subTitle: `${amount} ${localizationText.COMMON.SAR}` },
      { title: localizationText.INTERNATIONAL_TRANSFER.BENEFICIARY_NICK_NAME, subTitle: beneficiaryNickName, icon: '' },
      { title: localizationText.TRANSFER_SUMMARY.REASON, subTitle: transferPurpose, icon: '' },
      {
        title: localizationText.TRANSFER_SUMMARY.FAST_CONVERSION_BY,
        subTitle: instantTransferType,
        icon: images.sarie,
      },
      { title: localizationText.TRANSFER_SUMMARY.NOTE, subTitle: note, icon: '' },
      { title: localizationText.COMMON.REF_NUMBER, subTitle: authentication.transactionId, icon: icons.copy },
    ];
    setBeneficiaryData(beneficiaryDataArray);
  }, []);

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
    renderToast({ title: localizationText.TOP_UP.REF_NUMBER_COPIED, toastType: toastTypes.INFORMATION });
  };

  const onCloseBottomSheet = () => {
    otpBottomSheetRef?.current?.close();
  };

  const onPressTransfer = () => {
    otpBottomSheetRef?.current?.present();
  };

  const renderToastAPI = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
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

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onConfirm = async () => {
    if (walletNumber) {
      setIsLoadingConfrim(true);
      try {
        const deviceInfo = await getDeviceInfo();
        const payload: LocalTransferConfirmPayloadTypes = {
          otp,
          otpRef,
          amount,
          authentication,
          deviceInfo,
        };

        const apiResponse = await localTransferConfirm(walletNumber, payload);
        if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
          onCloseBottomSheet();
          navigate(ScreenNames.TRANSFER_SUCCESS, {
            amount: apiResponse?.response?.amountCredited,
            beneficiaryNickName: apiResponse?.response?.beneficiaryName,
            transferPurpose,
            instantTransferType,
            note,
            refNumber: apiResponse?.response?.transactionId,
          });
        } else if (apiResponse?.apiResponseNotOk) {
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
        } else {
          setAPIError(apiResponse?.error);
        }
        setIsLoadingConfrim(false);
      } catch (error) {
        setIsLoadingConfrim(false);
        setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
        renderToastAPI(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
    }
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
              <IPayFootnoteText
                text={`${vatAmount} ${localizationText.COMMON.SAR}`}
                color={colors.primary.primary800}
              />
            </IPayView>

            <IPayView style={[styles.smallerTabView, styles.feesView]}>
              <IPayFootnoteText text={localizationText.LOCAL_TRANSFER.FEES} color={colors.natural.natural900} />
              <IPayFootnoteText
                text={`${feesAmount} ${localizationText.COMMON.SAR}`}
                color={colors.primary.primary800}
              />
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
                <IPayFootnoteText
                  text={`${totalAmount} ${localizationText.COMMON.SAR}`}
                  color={colors.primary.primary800}
                />
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
        <IPayOtpVerification
          setOtpError={setOtpError}
          ref={otpBottomSheetRef}
          onPressConfirm={onConfirm}
          mobileNumber={mobileNumber}
          setOtp={setOtp}
          showHelp
          handleOnPressHelp={handleOnPressHelp}
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

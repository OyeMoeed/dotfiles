import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayCheckbox,
  IPayFlag,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImageBackground,
  IPayLinearGradientView,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { BeneficiariesDetails, LocalizationKeysMapping } from '@app/enums/international-beneficiary-status.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { ValidateWUTransferPayload } from '@app/network/services/international-transfer/wu-transfer-validate/wu-transfer-validate.interface';
import wuValidateTransfer from '@app/network/services/international-transfer/wu-transfer-validate/wu-transfer-validate.service';
import { WUTransferPayload } from '@app/network/services/international-transfer/wu-transfer/wu-transfer.interface';
import westernUnionTransfer from '@app/network/services/international-transfer/wu-transfer/wu-transfer.service';
import getDeviceInfo from '@app/network/utilities/device-info-helper';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import beneficiaryKeysMapping from '@app/screens/international-transfer-info/international-transfer-info.constant';
import { setTermsConditionsVisibility } from '@app/store/slices/bottom-sheets-slice';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { ApiResponseStatusType, buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Flag from 'react-native-round-flags';
import { useDispatch } from 'react-redux';
import useInternationalTransferData from './internation-transfer-confirmation.hook';
import { InternationalTransferDataLabels } from './internationl-tranfer-confirmation.constant';
import internationalTransferConfirmationStyles from './internationl-transfer-confirmation.style';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { SNAP_POINT } from '@app/constants/constants';

const InternationalTransferConfirmation: React.FC = ({ route }: any) => {
  const { beneficiaryData, feesInquiryData } = route.params;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = internationalTransferConfirmationStyles();
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [promoMatchSuccessfuly, setPromoMatchSuccessfuly] = useState<boolean>(false);
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const [isHelpCenterVisible, setHelpCenterVisible] = useState<boolean>(false);
  const promoCodeBottomSheetRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);
  const { getDataByKey } = useInternationalTransferData();
  const { getValues, control, setValue } = useForm();
  const promoCodeText = getValues('promo_code');
  const userInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo.userContactInfo);

  const contentViewBg = [colors.primary.primary100, colors.secondary.secondary100];
  // TODO
  const promoAmount = '70';
  const discountAmount = '10';
  const dummyPromo = '1234';
  const dispatch = useDispatch();

  const [apiError, setAPIError] = useState<string>('');
  const [validateBeneficiaryData, setValidateBeneficiaryData] = useState({});
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');

  const otpVerificationRef = useRef<bottomSheetTypes>(null);

  const { showToast } = useToastContext();

  const { otpConfig } = useConstantData();

  const onCheckTermsAndConditions = () => {
    setCheckTermsAndConditions(!checkTermsAndConditions);
  };
  const onPressTermsAndConditions = () => {
    dispatch(
      setTermsConditionsVisibility({
        isVisible: true,
      }),
    );
  };

  const handleClosePress = () => {
    promoCodeBottomSheetRef?.current?.close();
  };
  const onClearInputAction = () => {
    setIsError(false);
    setErrorMessage('');
    setValue('promo_code', '');
    setPromoMatchSuccessfuly(false);
  };

  const onPressSavePromo = () => {
    if (getValues('promo_code') === dummyPromo) {
      setPromoMatchSuccessfuly(true);
      setIsError(false);
      setErrorMessage('');
      requestAnimationFrame(() => {
        handleClosePress();
      });
    } else {
      setIsError(true);
      setErrorMessage(t('INTERNATIONAL_TRANSFER.PROMO_CODE_DOES_NOT_EXIST'));
    }
  };

  const onPressEnterPromo = () => {
    promoCodeBottomSheetRef?.current?.present();
  };

  const discountFees = useMemo((): string => {
    const tansferDiscount = t('INTERNATIONAL_TRANSFER.TRANSFER_FEE_DISCOUNT');
    return `${tansferDiscount}: ${discountAmount} ${t('COMMON.SAR')}`;
  }, [promoMatchSuccessfuly]);

  const totalAmount = () => {
    const total =
      Number(feesInquiryData?.vatAmount) +
      Number(feesInquiryData?.feeAmount) +
      Number(feesInquiryData?.remitterCurrencyAmount);
    return `${total ?? 0} ${t('COMMON.SAR')}`;
  };

  const getWidth = (): string[] => {
    if (isAndroidOS) {
      return ['1%', isError ? '36%' : '33%'];
    }
    return ['1%', isError ? '43%' : '40%'];
  };

  const onCloseBottomSheet = () => {
    setOtpSheetVisible(false);
  };

  const onPressHelp = () => {
    setHelpCenterVisible(true);
  };

  const getGeneratedBeneficiaryFees = () => {
    const checkIncludeFees = (key) => (feesInquiryData[key] ? t('COMMON.YES') : t('COMMON.NO'));    
    return Object.keys(feesInquiryData)
      ?.map((key) => ({
        label: key,
        value: key === 'isIncludeFees' ? checkIncludeFees(key) : feesInquiryData[key],
      }))
      ?.filter((key) => beneficiaryKeysMapping[BeneficiariesDetails.FEES].includes(key?.label));
  };

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const validateWUBeneficiary = async () => {
    const payload: ValidateWUTransferPayload = {
      amount: feesInquiryData?.beneficiaryCurrencyAmount,
      amountCurrency: feesInquiryData?.remitterCurrencyAmount,
      wuTransactionReason: beneficiaryData?.selectedReason?.desc,
      transferPurposeCode: beneficiaryData?.selectedReason?.code,
      feeAmount: feesInquiryData?.feeAmount,
      vatAmount: feesInquiryData?.vatAmount,
      bankFeeAmount: feesInquiryData?.bankFeeAmount,
      bankVatAmount: feesInquiryData?.bankVatAmount,
      promoCode: promoCodeText,
      deviceInfo: await getDeviceInfo(),
    };
    try {
      const apiResponse = await wuValidateTransfer(payload, beneficiaryData?.beneficiaryCode);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setValidateBeneficiaryData(apiResponse?.response);
          setOtpSheetVisible(true);
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(t('ERROR.API_ERROR_RESPONSE'));
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const transferWesternUnion = async () => {
    const payload: WUTransferPayload = {
      authentication: validateBeneficiaryData?.transactionId,
      otpRef: validateBeneficiaryData?.otpRef,
      otp,
      deviceInfo: await getDeviceInfo(),
    };
    try {
      const apiResponse = await westernUnionTransfer(beneficiaryData?.beneficiaryCode, payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          onCloseBottomSheet();
          navigate(ScreenNames.INTERNATIONAL_TRANSFER_SUCCESS);
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(t('ERROR.API_ERROR_RESPONSE'));
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const getLabelSuffix = (label: string) => {
    if(label === 'beneficiaryCurrencyAmount'){
      return `${t(`INTERNATIONAL_TRANSFER.${LocalizationKeysMapping[label]}`)} (${feesInquiryData?.principleCurrency ?? ''})`
    }
    return t(`INTERNATIONAL_TRANSFER.${LocalizationKeysMapping[label]}`)
  }

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title="INTERNATIONAL_TRANSFER.TRANSFER_CONFIRMATION" />
      <IPayView style={styles.container}>
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayLinearGradientView style={styles.gradientView} gradientColors={contentViewBg}>
            <IPayView style={styles.transferMsgView}>
              <IPayIcon icon={icons.clock3} size={24} />
              <IPayFootnoteText text="INTERNATIONAL_TRANSFER.AMOUNT_TRANSFER_MESSAGE" style={styles.transferMsgText} />
            </IPayView>

            <IPayView style={styles.receiverInfoContainer}>
              <IPayFlag countryCode={beneficiaryData?.countryCode} />
              <IPayView style={styles.receiverInfoView}>
                <IPayFootnoteText
                  regular={false}
                  text={beneficiaryData?.fullName}
                  color={colors.natural.natural900}
                  shouldTranslate={false}
                />
                <IPayCaption1Text
                  text={`${beneficiaryData?.countryDesc} - ${beneficiaryData?.remittanceTypeDesc}: ${beneficiaryData?.transferGateway ?? ''}`}
                  style={styles.receiverInfoText}
                  shouldTranslate={false}
                />
                <IPayCaption1Text
                  text={beneficiaryData?.beneficiaryAccountNumber}
                  style={styles.receiverInfoText}
                  shouldTranslate={false}
                />
                <IPayCaption1Text
                  text={beneficiaryData?.bankName}
                  style={styles.receiverInfoText}
                  shouldTranslate={false}
                />
              </IPayView>
            </IPayView>

            <IPayView style={styles.reasonView}>
              <IPayFootnoteText
                text={getDataByKey(InternationalTransferDataLabels.reason_of_transfer)?.label}
                color={colors.natural.natural900}
              />
              <IPaySubHeadlineText
                text={beneficiaryData?.selectedReason?.desc}
                regular
                color={colors.primary.primary800}
              />
            </IPayView>

            <IPayFlatlist
              data={getGeneratedBeneficiaryFees()}
              scrollEnabled={false}
              itemSeparatorStyle={styles.itemSeparatorStyle}
              renderItem={({ item: { label, value } }) => (

                <IPayView style={styles.listedContent}>
                  <IPaySubHeadlineText
                    regular
                    text={getLabelSuffix(label)}
                    color={colors.natural.natural900}
                  />
                  <IPaySubHeadlineText
                    regular
                    text={label === 'feeAmount' || label === 'vatAmount' ? `${value} ${t('COMMON.SAR')}` : value}
                    color={colors.primary.primary800}
                  />
                </IPayView>
              )}
            />
          </IPayLinearGradientView>
        </IPayScrollView>
        <IPayView style={styles.footerView}>
          <IPayLinearGradientView
            style={styles.footerGradientView}
            gradientColors={colors.appGradient.gradientPrimary10}
          >
            <IPayImageBackground
              image={promoMatchSuccessfuly ? images.promoCodeBgGreen : images.promoCodeBg}
              style={styles.imageBackground}
            >
              <IPayView
                style={[styles.promocodeContainer, promoMatchSuccessfuly && styles.promocodeContainerContitional]}
              >
                <IPayView>
                  <IPayFootnoteText text="INTERNATIONAL_TRANSFER.PROMO_CODE" />
                  {promoMatchSuccessfuly && <IPayCaption2Text text={discountFees} color={colors.natural.natural500} />}
                </IPayView>
                <IPayPressable
                  style={[styles.enterPromocodeBtn, promoMatchSuccessfuly && styles.enterPromocodeBtnContitional]}
                  onPress={onPressEnterPromo}
                >
                  <IPaySubHeadlineText
                    text={promoMatchSuccessfuly ? promoCodeText : t('INTERNATIONAL_TRANSFER.ENTER_CODE')}
                    color={promoMatchSuccessfuly ? colors.success.success800 : colors.primary.primary500}
                    style={styles.enterPromoText}
                  />
                  <IPayIcon icon={icons.rightArrow_DEFAULT} size={18} color={colors.primary.primary500} />
                </IPayPressable>
              </IPayView>
            </IPayImageBackground>

            <IPayView style={styles.totalAmountView}>
              <IPayFootnoteText text="LOCAL_TRANSFER.TOTAL_AMOUNT" color={colors.natural.natural900} />
              <IPayView style={styles.amountView}>
                <IPaySubHeadlineText regular text={promoAmount} style={styles.strikethroughText} />
                <IPaySubHeadlineText regular text={totalAmount()} color={colors.primary.primary800} />
              </IPayView>
            </IPayView>

            <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsAndConditionsParentView}>
              <IPayView style={styles.termsAndConditionsView}>
                <IPayCheckbox onPress={onCheckTermsAndConditions} isCheck={checkTermsAndConditions} />
                <IPayFootnoteText style={styles.termAndConditionsText} text="COMMON.TERMS_AND_CONDITIONS_TEXT" />
                <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>
            <IPayButton
              large
              btnType={buttonVariants.PRIMARY}
              btnText="INTERNATIONAL_TRANSFER.TRANSFER"
              btnIconsDisabled
              disabled={!checkTermsAndConditions}
              onPress={validateWUBeneficiary}
            />
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>

      <IPayBottomSheet
        testID="promo-code-bottom-sheet"
        heading="INTERNATIONAL_TRANSFER.PROMO_CODE"
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={getWidth()}
        onCloseBottomSheet={handleClosePress}
        ref={promoCodeBottomSheetRef}
        bold
      >
        <IPayView style={styles.bottomsheetView}>
          <Controller
            name="promo_code"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <IPayAnimatedTextInput
                testID="promo_code-input"
                label="INTERNATIONAL_TRANSFER.PROMO_CODE"
                containerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                showRightIcon
                customIcon={<IPayIcon icon={icons.cross_square} size={18} color={colors.natural.natural500} />}
                onClearInput={onClearInputAction}
                editable
                inputMode="numeric"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (promoCodeText && promoCodeText.length > 0) onClearInputAction();
                }}
                isError={isError}
                assistiveText={isError ? errorMessage : ''}
                errorMessageViewStyle={styles.errorMessageView}
                errorMessageStyle={styles.errorMessage}
              />
            )}
          />
          <IPayButton
            large
            btnType={buttonVariants.PRIMARY}
            btnText="COMMON.SAVE"
            btnIconsDisabled
            btnStyle={styles.saveBtnStyle}
            onPress={onPressSavePromo}
          />
        </IPayView>
      </IPayBottomSheet>
      <IPayPortalBottomSheet
        testID="otp-bottom-sheet"
        heading="LOCAL_TRANSFER.TRANSFER"
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        isVisible={isOtpSheetVisible}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={transferWesternUnion}
          mobileNumber={userInfo?.mobileNumber}
          setOtp={setOtp}
          otp={otp}
          setOtpError={setOtpError}
          otpError={otpError}
          showHelp
          timeout={otpConfig.login.otpTimeout}
          handleOnPressHelp={onPressHelp}
          onResendCodePress={() => otpVerificationRef?.current?.resetInterval()}
        />
      </IPayPortalBottomSheet>
      <IPayPortalBottomSheet
        testID="help-center-bottom-sheet"
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        ref={helpCenterRef}
        isVisible={isHelpCenterVisible}
      >
        <HelpCenterComponent />
      </IPayPortalBottomSheet>
    </IPaySafeAreaView>
  );
};

export default InternationalTransferConfirmation;

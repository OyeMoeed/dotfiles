import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayCheckbox,
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
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { BeneficiariesDetails, LocalizationKeysMapping } from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { AETransferConfirmDetails } from '@app/network/services/international-transfer/ae-transfer-confirm/ae-transfer-confirm.interface';
import alinmaExpressTransferConfirm from '@app/network/services/international-transfer/ae-transfer-confirm/ae-transfer-confirm.service';
import {
  AETransferPrepareDetails,
  AETransferPreparePayload,
} from '@app/network/services/international-transfer/ae-transfer-prepare/ae-transfer-prepare.interface';
import alinmaExpressTransferPrepare from '@app/network/services/international-transfer/ae-transfer-prepare/ae-transfer-prepare.service';
import {
  ValidateWUTransferPayload,
  ValidateWUTransferResponse,
} from '@app/network/services/international-transfer/wu-transfer-validate/wu-transfer-validate.interface';
import wuValidateTransfer from '@app/network/services/international-transfer/wu-transfer-validate/wu-transfer-validate.service';
import {
  WUTransferDetails,
  WUTransferPayload,
} from '@app/network/services/international-transfer/wu-transfer/wu-transfer.interface';
import westernUnionTransfer from '@app/network/services/international-transfer/wu-transfer/wu-transfer.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { TransferService } from '@app/screens/international-beneficiary-transfer-form/international-beneficiary-transfer-form.interface';
import beneficiaryKeysMapping from '@app/screens/international-transfer-info/international-transfer-info.constant';
import { InternationalTransferSuccessData } from '@app/screens/international-transfer-success/international-transfer-success.interface';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { ApiResponseStatusType, buttonVariants, spinnerVariant } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Flag from 'react-native-round-flags';
import useInternationalTransferData from './internation-transfer-confirmation.hook';
import {
  FeesInquiryData,
  InternationalTransferConfirmationProps,
} from './international-transfer-confirmation.interface';
import { InternationalTransferDataLabels } from './internationl-tranfer-confirmation.constant';
import internationalTransferConfirmationStyles from './internationl-transfer-confirmation.style';

const InternationalTransferConfirmation: React.FC<InternationalTransferConfirmationProps> = ({ route }) => {
  const { beneficiaryData, feesInquiryData } = route.params;
  const { colors } = useTheme();
  const styles = internationalTransferConfirmationStyles();
  const localizationText = useLocalization();
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [promoMatchSuccessfuly, setPromoMatchSuccessfuly] = useState<boolean>(false);
  const termsAndConditionSheetRef = useRef<bottomSheetTypes>(null);
  const promoCodeBottomSheetRef = useRef<any>(null);
  const otpBottomSheetRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);
  const { getDataByKey } = useInternationalTransferData();
  const { getValues, control, setValue } = useForm();
  const promoCodeText = getValues('promo_code');
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);

  const contentViewBg = [colors.primary.primary100, colors.secondary.secondary100];
  // TODO
  const promoAmount = '70';
  const discountAmount = '10';
  const dummyPromo = '1234';

  const [apiError, setAPIError] = useState<string>('');
  const [validateBeneficiaryData, setValidateBeneficiaryData] = useState<
    AETransferPrepareDetails | ValidateWUTransferResponse
  >();
  const [transferConfirmData, setTransferConfirmData] = useState<WUTransferDetails | AETransferConfirmDetails>();
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');

  const otpVerificationRef = useRef<bottomSheetTypes>(null);

  const { showSpinner, hideSpinner } = useSpinnerContext();

  const { showToast } = useToastContext();

  const { otpConfig } = useConstantData();

  const onCheckTermsAndConditions = () => {
    setCheckTermsAndConditions(!checkTermsAndConditions);
  };
  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef?.current?.showTermsAndConditions();
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
      setErrorMessage(localizationText.INTERNATIONAL_TRANSFER.PROMO_CODE_DOES_NOT_EXIST);
    }
  };

  const onPressEnterPromo = () => {
    promoCodeBottomSheetRef?.current?.present();
  };

  const discountFees = useMemo((): string => {
    const tansferDiscount = localizationText.INTERNATIONAL_TRANSFER.TRANSFER_FEE_DISCOUNT;
    return `${tansferDiscount}: ${discountAmount} ${localizationText.COMMON.SAR}`;
  }, [promoMatchSuccessfuly]);

  const totalAmount = () => {
    const amount = getDataByKey(InternationalTransferDataLabels.total_amount)?.value;
    return `${amount}`;
  };

  const successDetailsData: InternationalTransferSuccessData = {
    beneficiary: beneficiaryData?.fullName,
    country: beneficiaryData?.countryDesc,
    transactionId: beneficiaryData?.beneficiaryCode,
    bankTransfer: beneficiaryData?.transferGateway,
    iban: beneficiaryData?.beneficiaryAccountNumber,
    bankName: beneficiaryData?.bankName,
    phoneNumber: beneficiaryData?.phoneNumber,
    reasonOfTransfer: beneficiaryData?.selectedReason?.desc,
    amountTo: feesInquiryData?.remitterCurrencyAmount,
    amountFrom: feesInquiryData?.beneficiaryCurrencyAmount,
    exchangeRate: feesInquiryData?.exchangeRate,
    vat: feesInquiryData?.feeAmount,
    fees: feesInquiryData?.vatAmount,
  };

  const getWidth = (): string[] => {
    if (isAndroidOS) {
      return ['1%', isError ? '36%' : '33%'];
    }
    return ['1%', isError ? '43%' : '40%'];
  };

  const onCloseBottomSheet = () => {
    otpBottomSheetRef?.current?.close();
  };

  const onPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const getGeneratedBeneficiaryFees = () => {
    const validateIncludeFees = (key: string) =>
      feesInquiryData[key as keyof FeesInquiryData] ? localizationText.COMMON.YES : localizationText.COMMON.NO;
    return Object.keys(feesInquiryData)
      ?.map((key) => ({
        label: key,
        value: key === 'isIncludeFees' ? validateIncludeFees(key) : feesInquiryData[key as keyof FeesInquiryData],
      }))
      ?.filter((key) => beneficiaryKeysMapping[BeneficiariesDetails.FEES].includes(key?.label));
  };

  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  }, []);

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
    renderSpinner(true);
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
          otpBottomSheetRef?.current?.present();
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const confirmTransfer = async () => {
    renderSpinner(true);
    const isAlinmaTransfer = beneficiaryData?.transferGateway === TransferService.ALINMAPAY_DIRECT;
    const payload: WUTransferPayload = {
      authentication: validateBeneficiaryData?.transactionId,
      otpRef: validateBeneficiaryData?.otpRef,
      otp,
      deviceInfo: await getDeviceInfo(),
      ...(isAlinmaTransfer ? { amount: feesInquiryData?.beneficiaryCurrencyAmount } : null),
    };
    try {
      let apiResponse = null;
      if (isAlinmaTransfer) {
        apiResponse = await alinmaExpressTransferConfirm(walletNumber, payload);
      } else {
        apiResponse = await westernUnionTransfer(beneficiaryData?.beneficiaryCode, payload);
      }
      const updatedSuccessDetailsData = {
        ...successDetailsData,
        totalAmount: apiResponse?.response?.totalTransactionAmount,
      };
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setTransferConfirmData(apiResponse?.response);
          onCloseBottomSheet();
          navigate(ScreenNames.INTERNATIONAL_TRANSFER_SUCCESS, {
            successDetailsData: updatedSuccessDetailsData,
            countryCode: beneficiaryData?.countryCode,
            transferConfirmData,
          });
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const aeTransferPrepare = async () => {
    renderSpinner(true);
    const payload: AETransferPreparePayload = {
      amount: feesInquiryData?.beneficiaryCurrencyAmount ?? '',
      amountCurrency: feesInquiryData?.remitterCurrencyAmount ?? '',
      feesAmount: feesInquiryData?.feeAmount ?? '',
      vatAmount: feesInquiryData?.vatAmount ?? '',
      bankFeesAmount: feesInquiryData?.bankFeeAmount ?? '',
      bankVatAmount: feesInquiryData?.bankVatAmount ?? '',
      deviceInfo: (await getDeviceInfo()) ?? '',
      beneficiaryCode: beneficiaryData?.beneficiaryCode ?? '',
      transferPurpose: beneficiaryData?.selectedReason?.desc ?? '',
      deductFeesFromAmount: feesInquiryData?.isIncludeFees ?? '',
    };
    try {
      const apiResponse = await alinmaExpressTransferPrepare(walletNumber, payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setValidateBeneficiaryData(apiResponse?.response);
          otpBottomSheetRef?.current?.present();
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const onPressTransfer = () => {
    if (beneficiaryData?.transferGateway === TransferService.ALINMAPAY_DIRECT) {
      aeTransferPrepare();
    } else {
      validateWUBeneficiary();
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.INTERNATIONAL_TRANSFER.TRANSFER_CONFIRMATION} />
      <IPayView style={styles.container}>
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayLinearGradientView style={styles.gradientView} gradientColors={contentViewBg}>
            <IPayView style={styles.transferMsgView}>
              <IPayIcon icon={icons.clock3} size={24} />
              <IPayFootnoteText
                text={localizationText.INTERNATIONAL_TRANSFER.AMOUNT_TRANSFER_MESSAGE}
                style={styles.transferMsgText}
              />
            </IPayView>

            <IPayView style={styles.receiverInfoContainer}>
              <Flag code={beneficiaryData?.countryCode} style={styles.countryFlagImg} />
              <IPayView style={styles.receiverInfoView}>
                <IPayFootnoteText regular={false} text={beneficiaryData?.fullName} color={colors.natural.natural900} />
                <IPayCaption1Text
                  text={`${beneficiaryData?.countryDesc} - ${beneficiaryData?.remittanceTypeDesc}: ${beneficiaryData?.transferGateway ?? ''}`}
                  style={styles.receiverInfoText}
                />
                <IPayCaption1Text text={beneficiaryData?.beneficiaryAccountNumber} style={styles.receiverInfoText} />
                <IPayCaption1Text text={beneficiaryData?.bankName} style={styles.receiverInfoText} />
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
                    text={localizationText.INTERNATIONAL_TRANSFER[LocalizationKeysMapping[label]]}
                    color={colors.natural.natural900}
                  />
                  <IPaySubHeadlineText
                    regular
                    text={label === 'feeAmount' || label === 'vatAmount' ? `${value} SAR` : value}
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
                  <IPayFootnoteText text={localizationText.INTERNATIONAL_TRANSFER.PROMO_CODE} />
                  {promoMatchSuccessfuly && <IPayCaption2Text text={discountFees} color={colors.natural.natural500} />}
                </IPayView>
                <IPayPressable
                  style={[styles.enterPromocodeBtn, promoMatchSuccessfuly && styles.enterPromocodeBtnContitional]}
                  onPress={onPressEnterPromo}
                >
                  <IPaySubHeadlineText
                    text={promoMatchSuccessfuly ? promoCodeText : localizationText.INTERNATIONAL_TRANSFER.ENTER_CODE}
                    color={promoMatchSuccessfuly ? colors.success.success800 : colors.primary.primary500}
                    style={styles.enterPromoText}
                  />
                  <IPayIcon icon={icons.rightArrow_DEFAULT} size={18} color={colors.primary.primary500} />
                </IPayPressable>
              </IPayView>
            </IPayImageBackground>

            <IPayView style={styles.totalAmountView}>
              <IPayFootnoteText text={localizationText.LOCAL_TRANSFER.TOTAL_AMOUNT} color={colors.natural.natural900} />
              <IPayView style={styles.amountView}>
                <IPaySubHeadlineText regular text={promoAmount} style={styles.strikethroughText} />
                <IPaySubHeadlineText regular text={totalAmount()} color={colors.primary.primary800} />
              </IPayView>
            </IPayView>

            <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsAndConditionsParentView}>
              <IPayView style={styles.termsAndConditionsView}>
                <IPayCheckbox onPress={onCheckTermsAndConditions} isCheck={checkTermsAndConditions} />
                <IPayFootnoteText
                  style={styles.termAndConditionsText}
                  text={localizationText.COMMON.TERMS_AND_CONDITIONS_TEXT}
                />
                <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>
            <IPayButton
              large
              btnType={buttonVariants.PRIMARY}
              btnText={localizationText.INTERNATIONAL_TRANSFER.TRANSFER}
              btnIconsDisabled
              disabled={!checkTermsAndConditions}
              onPress={onPressTransfer}
            />
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
      <IPayTermsAndConditions ref={termsAndConditionSheetRef} />

      <IPayBottomSheet
        testID="promo-code-bottom-sheet"
        heading={localizationText.INTERNATIONAL_TRANSFER.PROMO_CODE}
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
                label={localizationText.INTERNATIONAL_TRANSFER.PROMO_CODE}
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
            btnText={localizationText.COMMON.SAVE}
            btnIconsDisabled
            btnStyle={styles.saveBtnStyle}
            onPress={onPressSavePromo}
          />
        </IPayView>
      </IPayBottomSheet>
      <IPayBottomSheet
        testID="otp-bottom-sheet"
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
          ref={otpVerificationRef}
          onPressConfirm={confirmTransfer}
          mobileNumber={userInfo?.mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          apiError={apiError}
          showHelp
          timeout={otpConfig.login.otpTimeout}
          handleOnPressHelp={onPressHelp}
          onResendCodePress={() => otpVerificationRef?.current?.resetInterval()}
        />
      </IPayBottomSheet>

      <IPayBottomSheet
        testID="help-center-bottom-sheet"
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

export default InternationalTransferConfirmation;

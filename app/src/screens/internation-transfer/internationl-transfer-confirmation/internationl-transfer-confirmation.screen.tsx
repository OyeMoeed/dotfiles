import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayCheckbox,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayImageBackground,
  IPayLinearGradientView,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '@app/screens/auth/forgot-passcode/otp-verification.component';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useInternationalTransferData from './internation-transfer-confirmation.hook';
import { InternationalTransferDataLabels } from './internationl-tranfer-confirmation.constant';
import internationlTransferConfirmationStyles from './internationl-transfer-confirmation.style';

const InternationalTransferConfirmation: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationlTransferConfirmationStyles(colors);
  const localizationText = useLocalization();
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [promoMatchSuccessfuly, setPromoMatchSuccessfuly] = useState<boolean>(false);
  const termsAndConditionSheetRef = useRef<bottomSheetTypes>(null);
  const promoCodeBottomSheetRef = useRef<any>(null);
  const otpBottomSheetRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);
  const { getDataByKey, getTransactionListedData, getLocalizationKeyFromLabel } = useInternationalTransferData();
  const {
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const promoCodeText = getValues('promo_code');
  const mobileNumber = useTypedSelector((state) => state.walletInfoReducer?.walletInfo?.userContactInfo?.mobileNumber);
  const contentViewBg = [colors.primary.primary100, colors.secondary.secondary100];
  // TODO
  const promoAmount = '70';
  const discountAmount = '10';
  const dummyPromo = '1234';
  const iqamaId = '324234234';

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

  const getTransferInfo = () => {
    const country = getDataByKey(InternationalTransferDataLabels.country)?.value;
    const backTransferLabel = getDataByKey(InternationalTransferDataLabels.bank_transfer)?.label;
    const backTransferValue = getDataByKey(InternationalTransferDataLabels.bank_transfer)?.value;
    return `${country} - ${backTransferLabel}: ${backTransferValue}`;
  };

  const discountFees = useMemo((): string => {
    const tansferDiscount = localizationText.INTERNATIONAL_TRANSFER.TRANSFER_FEE_DISCOUNT;
    return `${tansferDiscount}: ${discountAmount} ${localizationText.COMMON.SAR}`;
  }, [promoMatchSuccessfuly]);

  const totalAmount = () => {
    const amount = getDataByKey(InternationalTransferDataLabels.total_amount)?.value;
    return `${amount} ${localizationText.COMMON.SAR}`;
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

  const onPressTransfer = () => {
    if (checkTermsAndConditions) otpBottomSheetRef?.current?.present();
  };

  const onConfirmPressOtp = () => {
    onCloseBottomSheet();
    navigate(ScreenNames.INTERNATIONAL_TRANSFER_SUCCESS);
  };

  const onPressHelp = () => {
    helpCenterRef?.current?.present();
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
                text={'INTERNATIONAL_TRANSFER.AMOUNT_TRANSFER_MESSAGE'}
                style={styles.transferMsgText}
              />
            </IPayView>

            <IPayView style={styles.receiverInfoContainer}>
              <IPayImage image={images.egyFlag} style={styles.countryFlagImg} />
              <IPayView style={styles.receiverInfoView}>
                <IPayFootnoteText
                  regular={false}
                  text={getDataByKey(InternationalTransferDataLabels.beneficiary)?.value}
                  color={colors.natural.natural900}
                />
                <IPayCaption1Text text={getTransferInfo()} style={styles.receiverInfoText} />
                <IPayCaption1Text
                  text={getDataByKey(InternationalTransferDataLabels.iban)?.value}
                  style={styles.receiverInfoText}
                />
                <IPayCaption1Text
                  text={getDataByKey(InternationalTransferDataLabels.bank_name)?.value}
                  style={styles.receiverInfoText}
                />
              </IPayView>
            </IPayView>

            <IPayView style={styles.reasonView}>
              <IPayFootnoteText
                text={getDataByKey(InternationalTransferDataLabels.reason_of_transfer)?.label}
                color={colors.natural.natural900}
              />
              <IPaySubHeadlineText
                text={getDataByKey(InternationalTransferDataLabels.reason_of_transfer)?.value}
                regular
                color={colors.primary.primary800}
              />
            </IPayView>

            <IPayFlatlist
              data={getTransactionListedData()}
              scrollEnabled={false}
              itemSeparatorStyle={styles.itemSeparatorStyle}
              renderItem={({ item: { label, value } }) => (
                <IPayView style={styles.listedContent}>
                  <IPaySubHeadlineText
                    regular
                    text={localizationText.INTERNATIONAL_TRANSFER[getLocalizationKeyFromLabel(label)]}
                    color={colors.natural.natural900}
                  />
                  <IPaySubHeadlineText regular text={value} color={colors.primary.primary800} />
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
                  <IPayFootnoteText text={'INTERNATIONAL_TRANSFER.PROMO_CODE'} />
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
              <IPayFootnoteText text={'LOCAL_TRANSFER.TOTAL_AMOUNT'} color={colors.natural.natural900} />
              <IPayView style={styles.amountView}>
                <IPaySubHeadlineText regular text={promoAmount} style={styles.strikethroughText} />
                <IPaySubHeadlineText regular text={totalAmount()} color={colors.primary.primary800} />
              </IPayView>
            </IPayView>

            <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsAndConditionsParentView}>
              <IPayView style={styles.termsAndConditionsView}>
                <IPayCheckbox onPress={onCheckTermsAndConditions} isCheck={checkTermsAndConditions} />
                <IPayFootnoteText style={styles.termAndConditionsText} text={'COMMON.TERMS_AND_CONDITIONS_TEXT'} />
                <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>
            <IPayButton
              large
              btnType={buttonVariants.PRIMARY}
              btnText={'INTERNATIONAL_TRANSFER.TRANSFER'}
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
            btnText={'COMMON.SAVE'}
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
        <OtpVerificationComponent
          onConfirmPress={onConfirmPressOtp}
          onPressHelp={onPressHelp}
          iqamaId={iqamaId}
          phoneNumber={mobileNumber}
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

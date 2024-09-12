import { Login } from '@app/assets/svgs';
import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySpinner,
  IPayView,
} from '@app/components/atoms';
import {
  IPayRHFAnimatedTextInput as IPayAnimatedTextInput,
  IPayButton,
  IPayHeader,
  IPayPageDescriptionText,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import constants, { SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { useKeyboardStatus } from '@app/hooks';
import { getValidationSchemas } from '@app/services';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import icons from '@assets/icons/index';
import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import HelpCenterComponent from '../forgot-passcode/help-center.component';
import useMobileAndIqamaVerification from './mobile-and-iqama-verification.hook';
import { FormValues } from './mobile-and-iqama-verification.interface';
import mobileAndIqamaStyles from './mobile-and-iqama-verification.style';

const MobileAndIqamaVerification: React.FC = () => {
  const {
    onCheckTermsAndConditions,
    checkTermsAndConditions,
    onPressTermsAndConditions,
    termsAndConditionSheetRef,
    isOtpSheetVisible,
    helpCenterRef,
    onCloseBottomSheet,
    handleOnPressHelp,
    keyboardVisible,
    onSubmit,
    onConfirm,
    otpError,
    setOtpError,
    isLoading,
    setOtp,
    otpVerificationRef,
    resendOtp,
    otp,
  } = useMobileAndIqamaVerification();

  const { t } = useTranslation();
  const { colors } = useTheme();
  const iqamaIdRef = useRef<TextInput>(null);
  const styles = mobileAndIqamaStyles(colors);

  const { otpConfig } = useConstantData();
  const { isKeyboardWillOpen } = useKeyboardStatus();

  const { mobileNumberSchema, iqamaIdSchema } = getValidationSchemas(t);

  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    iqamaId: iqamaIdSchema,
  });

  return (
    <IPayFormProvider<FormValues> validationSchema={validationSchema} defaultValues={{ mobileNumber: '', iqamaId: '' }}>
      {({ handleSubmit, watch }) => (
        <IPaySafeAreaView>
          <>
            {isLoading && <IPaySpinner />}
            <IPayHeader languageBtn />
            <IPayView style={styles.container}>
              <IPayScrollView showsVerticalScrollIndicator={false}>
                <>
                  <IPayView style={styles.loginIconView}>
                    <Login />
                  </IPayView>
                  <IPayView style={styles.headingView}>
                    <IPayPageDescriptionText heading="COMMON.ENTER_INFORMATION" text="COMMON.ENTER_VALID_ID_OR_IQAMA" />
                  </IPayView>
                  <IPayView style={styles.inputFieldsContainer}>
                    <IPayAnimatedTextInput
                      name="mobileNumber"
                      label="PROFILE.MOBILE_NUMBER"
                      editable
                      keyboardType="phone-pad"
                      maxLength={constants.MOBILE_NUMBER_LENGTH}
                      onMaxLengthReach={() => {
                        iqamaIdRef.current?.focus();
                      }}
                    />
                    <IPayView style={styles.inputTextView}>
                      <IPayAnimatedTextInput
                        ref={iqamaIdRef}
                        name="iqamaId"
                        label="COMMON.ID_IQAMA"
                        editable
                        keyboardType="number-pad"
                        maxLength={constants.IQAMA_ID_NUMBER_LENGTH}
                      />
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
                    onPress={handleSubmit(onSubmit)}
                    btnType="primary"
                    btnText="COMMON.NEXT"
                    large
                    rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
                  />
                </>
              </IPayScrollView>
            </IPayView>

            {(!keyboardVisible || !isKeyboardWillOpen) && (
              <IPayButton
                onPress={handleOnPressHelp}
                btnType={buttonVariants.LINK_BUTTON}
                btnText="COMMON.NEED_HELP"
                large
                btnStyle={styles.needHelpBtn}
                rightIcon={<IPayIcon icon={icons.message_question_help} size={20} color={colors.primary.primary500} />}
              />
            )}
            <IPayPortalBottomSheet
              noGradient
              heading="COMMON.LOGIN"
              enablePanDownToClose
              simpleBar
              customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
              onCloseBottomSheet={onCloseBottomSheet}
              isVisible={isOtpSheetVisible}
              bold
            >
              <IPayOtpVerification
                ref={otpVerificationRef}
                onPressConfirm={onConfirm}
                mobileNumber={watch('mobileNumber')}
                onResendCodePress={() => {
                  resendOtp();
                  otpVerificationRef?.current?.resetInterval();
                }}
                setOtp={setOtp}
                setOtpError={setOtpError}
                otpError={otpError}
                showHelp={false}
                timeout={otpConfig.login.otpTimeout}
                otp={otp}
              />
            </IPayPortalBottomSheet>
            {isLoading && <IPaySpinner />}
            <IPayBottomSheet
              heading="FORGOT_PASSCODE.HELP_CENTER"
              enablePanDownToClose
              simpleBar
              backBtn
              customSnapPoint={SNAP_POINTS.LARGE}
              ref={helpCenterRef}
            >
              <HelpCenterComponent hideFAQError />
            </IPayBottomSheet>
            <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
          </>
        </IPaySafeAreaView>
      )}
    </IPayFormProvider>
  );
};

export default MobileAndIqamaVerification;

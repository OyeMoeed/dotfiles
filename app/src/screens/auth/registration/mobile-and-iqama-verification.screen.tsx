import { Login } from '@app/assets/svgs';
import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import {
  IPayRHFAnimatedTextInput as IPayAnimatedTextInput,
  IPayButton,
  IPayHeader,
  IPayPageDescriptionText,
  useToastContext,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import constants, { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { useKeyboardStatus } from '@app/hooks';
import { getValidationSchemas } from '@app/services';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, ToastTypes } from '@app/utilities/enums.util';
import icons from '@assets/icons/index';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import networkConstants from '@app/network/constants';
import { getValueFromAsyncStorage, setValueToAsyncStorage, StorageKeys } from '@app/utilities';
import RNRestart from 'react-native-restart';
import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import IPayLocationPermissionSheet from '@app/components/organism/ipay-location-permission-sheet/ipay-location-permission-sheet.component';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { isEditableBaseURL } from '@app/network/utilities/base-url';
import HelpCenterComponent from '../forgot-passcode/help-center.component';
import useMobileAndIqamaVerification from './mobile-and-iqama-verification.hook';
import { FormValues } from './mobile-and-iqama-verification.interface';
import mobileAndIqamaStyles from './mobile-and-iqama-verification.style';

const MobileAndIqamaVerification: React.FC = () => {
  const {
    onCheckTermsAndConditions,
    checkTermsAndConditions,
    onPressTermsAndConditions,
    isOtpSheetVisible,
    onCloseBottomSheet,
    handleOnPressHelp,
    onSubmit,
    onConfirm,
    otpError,
    setOtpError,
    setOtp,
    otpVerificationRef,
    resendOtp,
    otp,
    isHelpSheetVisible,
    onCloseHelpSheet,
    setLocationData,
  } = useMobileAndIqamaVerification();

  const { t } = useTranslation();
  const { colors } = useTheme();
  const iqamaIdRef = useRef<TextInput>(null);
  const styles = mobileAndIqamaStyles(colors);

  const { otpConfig } = useConstantData();
  const { isKeyboardOpen } = useKeyboardStatus();

  const { mobileNumberSchema, iqamaIdSchema } = getValidationSchemas(t);

  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    iqamaId: iqamaIdSchema,
  });

  const { showToast } = useToastContext();
  const [currentSelectedEnv, setCurrentSelectedEnv] = useState<string>('');

  const getCurrentEnv = async () => {
    const currentEnv = await getValueFromAsyncStorage(StorageKeys.ENV);
    if (currentEnv) setCurrentSelectedEnv(currentEnv);
  };

  useEffect(() => {
    getCurrentEnv();
  }, []);

  const onInvalidFormValues = (formValues: FieldValues) => {
    const title = formValues.mobileNumber?.message
      ? t('COMMON.INCORRECT_MOBILE_NUMBER')
      : t('COMMON.INCORRECT_IQAMA_NUMBER');
    showToast(
      {
        title,
        subTitle: t('COMMON.VERIFY_NUMBER_ACCURACY'),
        toastType: ToastTypes.WARNING,
        isShowRightIcon: false,
        leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      },
      5000,
    );
  };

  const handleSubmitMethod = async (handleSubmit: UseFormHandleSubmit<FormValues, undefined>) => {
    await handleSubmit(onSubmit, onInvalidFormValues)();
  };

  const onChangeEnviroment = async (selected: string) => {
    if (!selected) return;
    if (selected !== currentSelectedEnv) {
      await setValueToAsyncStorage(StorageKeys.ENV, selected);
      setTimeout(() => {
        RNRestart.restart();
      }, 300);
    }
  };

  const renderEnviromentSwitch = () => (
    <IPayView style={styles.inputTextView}>
      <IPayDropdownSelect
        onSelectListItem={onChangeEnviroment}
        data={networkConstants.API_ENV}
        selectedValue={currentSelectedEnv}
        label="Switch Enviroment"
        labelKey="title"
        valueKey="title"
      />
    </IPayView>
  );
  const onLocationSelected = useCallback(
    (position: GeoCoordinates) => {
      setLocationData(position);
    },
    [setLocationData],
  );

  return (
    <IPayFormProvider<FormValues> validationSchema={validationSchema} defaultValues={{ mobileNumber: '', iqamaId: '' }}>
      {({ handleSubmit, watch }) => (
        <IPaySafeAreaView>
          <>
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
                    onPress={() => handleSubmitMethod(handleSubmit)}
                    btnType={buttonVariants.PRIMARY}
                    btnText="COMMON.NEXT"
                    large
                    rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
                  />
                  {isEditableBaseURL() && renderEnviromentSwitch()}
                </>
              </IPayScrollView>
            </IPayView>

            {!isKeyboardOpen && (
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
            <IPayPortalBottomSheet
              heading="FORGOT_PASSCODE.HELP_CENTER"
              enablePanDownToClose
              simpleBar
              backBtn
              customSnapPoint={['60%', '90%']}
              isVisible={isHelpSheetVisible}
              onCloseBottomSheet={onCloseHelpSheet}
            >
              <HelpCenterComponent hideFAQError />
            </IPayPortalBottomSheet>
            <IPayLocationPermissionSheet onLocationSelected={onLocationSelected} />
          </>
        </IPaySafeAreaView>
      )}
    </IPayFormProvider>
  );
};

export default MobileAndIqamaVerification;

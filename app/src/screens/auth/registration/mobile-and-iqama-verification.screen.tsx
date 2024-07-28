import { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { SubmitHandler } from 'react-hook-form';
import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySpinner,
  IPayView,
} from '@app/components/atoms';
import { useNavigation } from '@react-navigation/native';
import { Login } from '@app/assets/svgs';
import {
  IPayRHFAnimatedTextInput as IPayAnimatedTextInput,
  IPayButton,
  IPayHeader,
  IPayPageDescriptionText,
} from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate, resetNavigation, setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setToken } from '@app/network/client';
import { LoginUserPayloadProps } from '@app/network/services/authentication/login/login.interface';
import loginUser from '@app/network/services/authentication/login/login.service';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { getValidationSchemas } from '@app/services/validation-service';
import * as Yup from 'yup';
import HelpCenterComponent from '../forgot-passcode/help-center.component';
import mobileAndIqamaStyles from './mobile-and-iqama-verification.style';
import { FormValues } from './mobile-and-iqama-verification.interface';

const MobileAndIqamaVerification = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [otpRef, setOtpRef] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const styles = mobileAndIqamaStyles(colors);
  const localizationText = useLocalization();
  const bottomSheetRef = useRef(null);
  const termsAndConditionSheetRef = useRef(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);
  const { showToast } = useToastContext();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    setTopLevelNavigator(navigation);
  }, []);

  const onCloseBottomSheet = () => {
    otpVerificationRef.current?.resetInterval();
  };

  const renderToast = (toastMsg: string, hideSubtitle?: boolean) => {
    showToast({
      title: toastMsg || localizationText.api_request_failed,
      subTitle: !hideSubtitle ? apiError || localizationText.CARDS.VERIFY_CODE_ACCURACY : '',
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainer,
    });
  };

  const onPressConfirm = (isNewMember: boolean) => {
    onCloseBottomSheet();
    bottomSheetRef.current?.close();
    requestAnimationFrame(() => {
      if (isNewMember) {
        navigate(screenNames.SET_PASSCODE);
      } else {
        resetNavigation(screenNames.LOGIN_VIA_PASSCODE);
      }
    });
  };

  const redirectToOtp = () => {
    setIsLoading(false);
    onCloseBottomSheet();
    bottomSheetRef.current?.present();
  };

  const prepareTheLoginService = async (data) => {
    const { mobileNumber, iqamaId } = data;
    const deviceInfo = await getDeviceInfo();
    const apiResponse = await prepareLogin();
    if (apiResponse.status.type === 'SUCCESS') {
      dispatch(
        setAppData({
          transactionId: apiResponse?.authentication?.transactionId,
          encryptionData: apiResponse?.response,
          deviceInfo,
          authentication: apiResponse?.headers?.authorization,
          mobileNumber: mobileNumber.toString(),
          poiNumber: iqamaId.toString(),
        }),
      );
      setToken(apiResponse?.headers?.authorization);
      await checkIfUserExists(apiResponse, deviceInfo, mobileNumber, iqamaId);
    }
  };
  const checkIfUserExists = async (prepareResponse: any, deviceInfo: any, mobileNumber: string, iqamaId: string) => {
    setIsLoading(true);
    try {
      const payload: LoginUserPayloadProps = {
        username: encryptData(
          `${prepareResponse.response.passwordEncryptionPrefix}${mobileNumber.toString()}`,
          prepareResponse.response.passwordEncryptionKey,
        ),
        poi: encryptData(
          `${prepareResponse.response.passwordEncryptionPrefix}${iqamaId.toString()}`,
          prepareResponse.response.passwordEncryptionKey,
        ),
        authentication: { transactionId: prepareResponse.authentication.transactionId },
        deviceInfo: deviceInfo,
      };

      const apiResponse = await loginUser(payload);
      if (apiResponse.status.type === 'SUCCESS') {
        setTransactionId(prepareResponse.authentication.transactionId);
        if (apiResponse?.response?.otpRef) {
          setOtpRef(apiResponse?.response?.otpRef);
        }
        redirectToOtp();
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!checkTermsAndConditions) {
      renderToast(localizationText.COMMON.TERMS_AND_CONDITIONS_VALIDATION, true);
      return;
    }
    prepareTheLoginService(data);
  };

  const onCheckTermsAndConditions = () => {
    setCheckTermsAndConditions(!checkTermsAndConditions);
  };

  const { mobileNumberSchema, iqamaIdSchema } = getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    iqamaId: iqamaIdSchema,
  });

  return (
    <IPayFormProvider<FormValues> validationSchema={validationSchema} defaultValues={{ mobileNumber: '', iqamaId: '' }}>
      {({ handleSubmit, watch }) => (
        <IPaySafeAreaView>
          {isLoading && <IPaySpinner />}
          <IPayHeader languageBtn />
          <IPayView style={styles.container}>
            <IPayScrollView showsVerticalScrollIndicator={false}>
              <>
                <IPayView style={styles.loginIconView}>
                  <Login />
                </IPayView>
                <IPayView style={styles.headingView}>
                  <IPayPageDescriptionText
                    heading={localizationText.COMMON.ENTER_INFORMATION}
                    text={localizationText.COMMON.ENTER_VALID_ID_OR_IQAMA}
                  />
                </IPayView>
                <IPayView style={styles.inputFieldsContainer}>
                  <IPayAnimatedTextInput
                    name="mobileNumber"
                    label={localizationText.PROFILE.MOBILE_NUMBER}
                    editable
                    keyboardType="phone-pad"
                    maxLength={constants.MOBILE_NUMBER_LENGTH}
                  />
                  <IPayView style={styles.inputTextView}>
                    <IPayAnimatedTextInput
                      name="iqamaId"
                      label={localizationText.COMMON.ID_IQAMA}
                      editable
                      keyboardType="number-pad"
                      maxLength={constants.IQAMA_ID_NUMBER_LENGTH}
                    />
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
                  onPress={handleSubmit(onSubmit)}
                  btnType="primary"
                  btnText={localizationText.COMMON.NEXT}
                  large
                  rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
                />
              </>
            </IPayScrollView>
          </IPayView>
          {!keyboardVisible && (
            <IPayButton
              onPress={handleOnPressHelp}
              btnType="link-button"
              btnText={localizationText.COMMON.NEED_HELP}
              large
              btnStyle={styles.needHelpBtn}
              rightIcon={<IPayIcon icon={icons.message_question_help} size={20} color={colors.primary.primary500} />}
            />
          )}
          <IPayBottomSheet
            heading={localizationText.COMMON.LOGIN}
            enablePanDownToClose
            simpleBar
            customSnapPoint={['1%', '100%']}
            onCloseBottomSheet={onCloseBottomSheet}
            ref={bottomSheetRef}
            bold
          >
            <IPayOtpVerification
              ref={otpVerificationRef}
              onPressConfirm={onPressConfirm}
              mobileNumber={watch('mobileNumber')}
              iqamaId={watch('iqamaId')}
              otpRef={otpRef}
              transactionId={transactionId}
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
          <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
        </IPaySafeAreaView>
      )}
    </IPayFormProvider>
  );
};

export default MobileAndIqamaVerification;

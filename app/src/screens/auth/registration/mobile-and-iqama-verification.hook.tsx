import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate, resetNavigation, setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setToken } from '@app/network/client';
import { LoginUserPayloadProps } from '@app/network/services/authentication/login/login.interface';
import loginUser from '@app/network/services/authentication/login/login.service';
import { OtpVerificationProps } from '@app/network/services/authentication/otp-verification/otp-verification.interface';
import otpVerification from '@app/network/services/authentication/otp-verification/otp-verification.service';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { FormValues } from './mobile-and-iqama-verification.interface';

const useMobileAndIqamaVerification = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useTypedDispatch();
  const { showToast } = useToastContext();
  const localizationText = useLocalization();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [otpRef, setOtpRef] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const bottomSheetRef = useRef<bottomSheetTypes>(null);
  const termsAndConditionSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  useEffect(() => {
    setTopLevelNavigator(navigation);
  }, []);

  const onCheckTermsAndConditions = () => {
    setCheckTermsAndConditions(!checkTermsAndConditions);
  };
  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef?.current?.showTermsAndConditions();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef.current?.resetInterval();
  };
  const redirectToOtp = () => {
    setIsLoading(false);
    onCloseBottomSheet();
    bottomSheetRef.current?.present();
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
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

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const payload: OtpVerificationProps = {
        otp,
        otpRef,
        authentication: { transactionId },
        deviceInfo: appData.deviceInfo,
      };
      const apiResponse: any = await otpVerification(payload, dispatch);
      if (apiResponse.status.type === 'SUCCESS') {
        if (onPressConfirm) onPressConfirm(apiResponse?.response?.newMember);
      } else if (apiResponse?.apiResponseNotOk) {
        setOtpError(true);
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setOtpError(true);
        setAPIError(apiResponse?.error);
        otpVerificationRef.current?.triggerToast(localizationText.ERROR.INVALID_OTP, false);
      }
      setIsLoading(false);
    } catch (error) {
      setOtpError(true);
      setAPIError(localizationText.ERROR.INVALID_OTP);
      otpVerificationRef.current?.triggerToast(localizationText.ERROR.INVALID_OTP, false);
    }
  };

  const renderToast = (toastMsg: string, hideSubtitle?: boolean) => {
    showToast({
      title: toastMsg || localizationText.ERROR.API_ERROR_RESPONSE,
      subTitle: !hideSubtitle ? apiError || localizationText.CARDS.VERIFY_CODE_ACCURACY : '',
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const checkIfUserExists = async (prepareResponse: any, deviceInfo: any, mobileNumber: string, iqamaId: string) => {
    setIsLoading(true);
    try {
      const payload: LoginUserPayloadProps = {
        username:
          encryptData(
            `${prepareResponse.response.passwordEncryptionPrefix}${mobileNumber.toString()}`,
            prepareResponse.response.passwordEncryptionKey,
          ) || '',
        poi:
          encryptData(
            `${prepareResponse.response.passwordEncryptionPrefix}${iqamaId.toString()}`,
            prepareResponse.response.passwordEncryptionKey,
          ) || '',
        authentication: { transactionId: prepareResponse.authentication.transactionId },
        deviceInfo,
      };

      const apiResponse: any = await loginUser(payload);
      if (apiResponse.status.type === 'SUCCESS') {
        setTransactionId(prepareResponse.authentication.transactionId);
        if (apiResponse?.response?.otpRef) {
          setOtpRef(apiResponse?.response?.otpRef);
        }
        dispatch(
          setAppData({
            otpTimeout: apiResponse?.response?.otpTimeout,
          }),
        );
        redirectToOtp();
      } else if (apiResponse?.apiResponseNotOk) {
        setOtpError(true);
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setOtpError(true);
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setOtpError(true);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const prepareTheLoginService = async (data: any) => {
    const { mobileNumber, iqamaId } = data;
    const deviceInfo = await getDeviceInfo();
    const apiResponse: any = await prepareLogin();
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setOtpError(false);
    if (!checkTermsAndConditions) {
      renderToast(localizationText.COMMON.TERMS_AND_CONDITIONS_VALIDATION, true);
      return;
    }
    prepareTheLoginService(data);
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

  const onConfirm = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      verifyOtp();
    }
  };

  return {
    isLoading,
    otpError,
    apiError,
    checkTermsAndConditions,
    keyboardVisible,
    bottomSheetRef,
    termsAndConditionSheetRef,
    otpVerificationRef,
    helpCenterRef,
    onCheckTermsAndConditions,
    onPressTermsAndConditions,
    showToast,
    onCloseBottomSheet,
    redirectToOtp,
    handleOnPressHelp,
    setKeyboardVisible,
    onSubmit,
    onConfirm,
    setOtpError,
    setIsLoading,
    setOtp,
  };
};

export default useMobileAndIqamaVerification;

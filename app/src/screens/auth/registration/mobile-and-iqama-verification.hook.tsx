import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useLocation from '@app/hooks/location.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate, resetNavigation, setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { setToken } from '@app/network/client';
import { DeviceInfoProps, LoginUserPayloadProps } from '@app/network/services/authentication/login/login.interface';
import loginUser from '@app/network/services/authentication/login/login.service';
import { OtpVerificationProps } from '@app/network/services/authentication/otp-verification/otp-verification.interface';
import otpVerification from '@app/network/services/authentication/otp-verification/otp-verification.service';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { useLocationPermission } from '@app/services/location-permission.service';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType, spinnerVariant } from '@app/utilities/enums.util';
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
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const [resendOtpPayload, setResendOtpPayload] = useState<LoginUserPayloadProps>();
  const termsAndConditionSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const { fetchLocation } = useLocation();
  const { checkAndHandlePermission } = useLocationPermission();
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const renderSpinner = (isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  };

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
    setOtpSheetVisible(false);
    otpVerificationRef.current?.resetInterval();
    setOtpSheetVisible(false);
  };
  const redirectToOtp = () => {
    setIsLoading(false);
    onCloseBottomSheet();
    setOtpSheetVisible(true);
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onPressConfirm = (isNewMember: boolean) => {
    onCloseBottomSheet();
    setIsLoading(false);
    setOtpSheetVisible(false);
    requestAnimationFrame(() => {
      if (isNewMember) {
        navigate(ScreenNames.SET_PASSCODE);
      } else {
        resetNavigation(ScreenNames.LOGIN_VIA_PASSCODE);
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
      if (apiResponse.status.type === APIResponseType.SUCCESS) {
        if (onPressConfirm) onPressConfirm(apiResponse?.response?.newMember);
      } else if (apiResponse?.apiResponseNotOk) {
        setOtpError(true);
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
        setIsLoading(false);
      } else {
        setOtpError(true);
        setAPIError(apiResponse?.error);
        otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setOtpError(true);
      setAPIError(localizationText.COMMON.INCORRECT_CODE);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
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

      setResendOtpPayload(payload);

      const apiResponse: any = await loginUser(payload);
      if (apiResponse.status.type === APIResponseType.SUCCESS) {
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

  const resendOtp = async () => {
    renderSpinner(true);
    try {
      const apiResponse: any = await loginUser(resendOtpPayload as LoginUserPayloadProps);
      if (apiResponse.status.type === APIResponseType.SUCCESS) {
        if (apiResponse?.response?.otpRef) {
          setOtpRef(apiResponse?.response?.otpRef);
        }
        dispatch(
          setAppData({
            otpTimeout: apiResponse?.response?.otpTimeout,
          }),
        );
      } else if (apiResponse?.apiResponseNotOk) {
        setOtpError(true);
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setOtpError(true);
        setAPIError(apiResponse?.error);
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setOtpError(true);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const title = localizationText.LOCATION.PERMISSION_REQUIRED;
  const description = localizationText.LOCATION.LOCATION_PERMISSION_REQUIRED;

  const prepareTheLoginService = async (data: any) => {
    const { mobileNumber, iqamaId } = data;
    const locationData = await fetchLocation();
    if (!locationData) {
      return;
    }
    setIsLoading(true);
    const deviceInfo: DeviceInfoProps = {
      ...(await getDeviceInfo()),
      locationDetails: {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        city: '',
        district: '',
        country: '',
      },
    };

    const apiResponse: any = await prepareLogin(deviceInfo);
    if (apiResponse.status.type === APIResponseType.SUCCESS) {
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
    const hasLocation = await checkAndHandlePermission();
    if (!hasLocation) {
      return;
    }
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
    isOtpSheetVisible,
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
    resendOtp,
  };
};

export default useMobileAndIqamaVerification;

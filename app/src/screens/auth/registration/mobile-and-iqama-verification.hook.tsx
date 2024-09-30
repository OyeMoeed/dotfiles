import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { setToken } from '@app/network/client';
import { DeviceInfoProps, LoginUserPayloadProps } from '@app/network/services/authentication/login/login.interface';
import loginUser from '@app/network/services/authentication/login/login.service';
import { OtpVerificationProps } from '@app/network/services/authentication/otp-verification/otp-verification.interface';
import otpVerification from '@app/network/services/authentication/otp-verification/otp-verification.service';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import { encryptData, getDeviceInfo } from '@app/network/utilities';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setTermsConditionsVisibility } from '@app/store/slices/bottom-sheets-slice';
import { showPermissionModal } from '@app/store/slices/permission-alert-slice';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { FormValues } from './mobile-and-iqama-verification.interface';

const useMobileAndIqamaVerification = () => {
  const { colors } = useTheme();
  const dispatch = useTypedDispatch();
  const { showToast } = useToastContext();
  const { t } = useTranslation();
  const appData = useTypedSelector((state) => state.appDataReducer.appData);
  const [otpRef, setOtpRef] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const [resendOtpPayload, setResendOtpPayload] = useState<LoginUserPayloadProps>();
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const [locationData, setLocationData] = useState<GeoCoordinates | null>(null);

  const [isHelpSheetVisible, setHelpSheetVisible] = useState(false);

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

  const onCloseBottomSheet = () => {
    setOtpSheetVisible(false);
    otpVerificationRef.current?.resetInterval();
  };
  const redirectToOtp = () => {
    setIsLoading(false);
    setOtpSheetVisible(true);
  };

  const handleOnPressHelp = () => {
    setHelpSheetVisible(true);
  };

  const onCloseHelpSheet = () => {
    setHelpSheetVisible(false);
  };

  const onPressConfirm = (isNewMember: boolean) => {
    setIsLoading(false);

    requestAnimationFrame(() => {
      setOtpSheetVisible(false);

      if (isNewMember) {
        navigate(ScreenNames.SET_PASSCODE);
      } else {
        navigate(ScreenNames.LOGIN_VIA_PASSCODE);
      }
    });
  };

  const verifyOtp = async () => {
    setIsLoading(true);

    const payload: OtpVerificationProps = {
      otp,
      otpRef,
      authentication: { transactionId },
      deviceInfo: appData.deviceInfo,
    };
    const apiResponse: any = await otpVerification(payload, dispatch);
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      dispatch(setWalletInfo(apiResponse?.response));
      if (onPressConfirm) onPressConfirm(apiResponse?.response?.newMember);
    }
    setIsLoading(false);
  };

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg || 'ERROR.API_ERROR_RESPONSE',
      subTitle: 'CARDS.VERIFY_CODE_ACCURACY',
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
      if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
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
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setOtpError(true);
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const resendOtp = async () => {
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
      }
    } catch (error: any) {
      setOtpError(true);
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const prepareTheLoginService = async (data: any) => {
    const { mobileNumber, iqamaId } = data;
    if (!locationData) {
      dispatch(showPermissionModal());
      return;
    }

    setIsLoading(true);
    const deviceInfo: DeviceInfoProps = {
      ...(await getDeviceInfo()),
      locationDetails: {
        latitude: `${locationData.latitude}`,
        longitude: `${locationData.longitude}`,
        city: '',
        district: '',
        country: '',
      },
    };

    const apiResponse: any = await prepareLogin(deviceInfo);
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
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
      renderToast(t('COMMON.TERMS_AND_CONDITIONS_VALIDATION'));
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

  useEffect(() => {
    if (isOtpSheetVisible) {
      setOtp('');
    }
  }, [isOtpSheetVisible]);

  const onConfirm = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'), false);
    } else {
      verifyOtp();
    }
  };

  return {
    isLoading,
    otpError,
    checkTermsAndConditions,
    keyboardVisible,
    isOtpSheetVisible,
    otpVerificationRef,
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
    otp,
    setOtp,
    resendOtp,
    isHelpSheetVisible,
    onCloseHelpSheet,
    setLocationData,
  };
};

export default useMobileAndIqamaVerification;

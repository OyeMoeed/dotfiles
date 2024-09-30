import constants from '@app/constants/constants';
import { setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import { DeviceInfoProps } from '@app/network/services/authentication/login/login.interface';
import {
  PrepareForgetPasscodeProps,
  validateForgetPasscodeOtpReq,
} from '@app/network/services/core/prepare-forget-passcode/prepare-forget-passcode.interface';
import {
  prepareForgetPasscode,
  validateForgetPasscodeOtp,
} from '@app/network/services/core/prepare-forget-passcode/prepare-forget-passcode.service';
import { encryptData } from '@app/network/utilities';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CallbackProps } from '../forgot-passcode/forget-passcode.interface';

const useLogin = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [componentToRender, setComponentToRender] = useState<string>('');
  const [forgetPasswordFormData, setForgetPasswordFormData] = useState({
    iqamaId: '',
    otp: '',
    otpRef: '',
    passcode: '',
    confirmPasscode: '',
    transactionId: '',
    walletNumber: '',
  });
  const navigation = useNavigation();
  const appData = useTypedSelector((state) => state.appDataReducer.appData);
  const [otpRef, setOtpRef] = useState<string>('');
  const [resendOtpPayload, setResendOtpPayload] = useState<PrepareForgetPasscodeProps>();
  const [apiError] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);

  const otpVerificationRef = useRef<bottomSheetTypes>(null);

  useEffect(() => {
    setTopLevelNavigator(navigation);
  }, []);

  const onCallbackHandle = (data: CallbackProps) => {
    setComponentToRender(data.nextComponent || '');
    setForgetPasswordFormData((prevState) => ({
      ...prevState,
      ...data.data,
    }));
  };

  const verifyOtp = async () => {
    const body: validateForgetPasscodeOtpReq = {
      poiNumber: encryptData(
        `${appData?.encryptionData?.passwordEncryptionPrefix}${forgetPasswordFormData.iqamaId as string}`,
        appData?.encryptionData?.passwordEncryptionKey as string,
      ) as string,
      otp,
      otpRef: otpRef as string,
      authentication: { transactionId: forgetPasswordFormData.transactionId as string },
      deviceInfo: appData.deviceInfo as DeviceInfoProps,
    };
    const validateOtpRes = await validateForgetPasscodeOtp(body);

    if (validateOtpRes) {
      onCallbackHandle({
        nextComponent: constants.FORGET_PASSWORD_COMPONENTS.CREATE_PASSCODE,
        data: { otp, walletNumber: validateOtpRes?.response?.walletNumber },
      });
    }
  };

  const onConfirm = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'), false);
    } else {
      verifyOtp();
    }
  };

  const resendForgetPasscodeOtp = async () => {
    const apiResponse = await prepareForgetPasscode(resendOtpPayload as PrepareForgetPasscodeProps);
    if (apiResponse?.status?.type === 'SUCCESS') {
      const { otpRef: otpRefValue, walletNumber } = apiResponse?.data?.response || {};
      dispatch(setAppData({ otpRefValue, walletNumber }));

      setOtpRef(otpRefValue);
    }
  };

  return {
    setForgetPasswordFormData,
    onConfirm,
    otpError,
    setOtpError,
    setOtp,
    otpVerificationRef,
    apiError,
    setComponentToRender,
    componentToRender,
    forgetPasswordFormData,
    setOtpRef,
    setResendOtpPayload,
    resendForgetPasscodeOtp,
    otp,
  };
};

export default useLogin;

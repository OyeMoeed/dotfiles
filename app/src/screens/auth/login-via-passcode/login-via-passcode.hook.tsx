import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import { DeviceInfoProps } from '@app/network/services/authentication/login/login.interface';
import { validateForgetPasscodeOtpReq } from '@app/network/services/core/prepare-forget-passcode/prepare-forget-passcode.interface';
import { validateForgetPasscodeOtp } from '@app/network/services/core/prepare-forget-passcode/prepare-forget-passcode.service';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { useTypedSelector } from '@app/store/store';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { CallbackProps } from '../forgot-passcode/forget-passcode.interface';

const useLogin = () => {
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

  const localizationText = useLocalization();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [otpRef, setOtpRef] = useState<string>('');
  const [apiError, setAPIError] = useState<string>('');
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
    try {
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

      if (validateOtpRes.status.type === 'SUCCESS') {
        onCallbackHandle({
          nextComponent: constants.FORGET_PASSWORD_COMPONENTS.CREATE_PASSCODE,
          data: { otp, walletNumber: validateOtpRes?.response?.walletNumber },
        });
      } else {
        setOtpError(true);
        otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
      }
    } catch (error) {
      setOtpError(true);
      setAPIError(localizationText.ERROR.INVALID_OTP);
      otpVerificationRef.current?.triggerToast(localizationText.ERROR.INVALID_OTP, false);
    }
  };

  const onConfirm = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      verifyOtp();
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
  };
};

export default useLogin;

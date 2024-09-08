import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
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
import { encryptData } from '@app/network/utilities/encryption-helper';
import { useLocationPermission } from '@app/services/location-permission.service';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { spinnerVariant } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { CallbackProps } from '../forgot-passcode/forget-passcode.interface';

const useLogin = () => {
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
  const { checkAndHandlePermission } = useLocationPermission();
  const localizationText = useLocalization();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [otpRef, setOtpRef] = useState<string>('');
  const [resendOtpPayload, setResendOtpPayload] = useState<PrepareForgetPasscodeProps>();
  const [apiError, setAPIError] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const otpVerificationRef = useRef<bottomSheetTypes>(null);

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

  const onCallbackHandle = (data: CallbackProps) => {
    setComponentToRender(data.nextComponent || '');
    setForgetPasswordFormData((prevState) => ({
      ...prevState,
      ...data.data,
    }));
  };

  const verifyOtp = async () => {
    renderSpinner(true);

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
    }

    renderSpinner(false);
  };

  const onConfirm = () => {
    renderSpinner(true);
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      verifyOtp();
    }
    renderSpinner(false);
  };

  const resendForgetPasscodeOtp = async () => {
    renderSpinner(true);

    const apiResponse = await prepareForgetPasscode(resendOtpPayload as PrepareForgetPasscodeProps, dispatch);
    if (apiResponse?.status.type === 'SUCCESS') {
      setOtpRef(apiResponse?.response?.otpRef as string);
    }

    renderSpinner(false);
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
    checkAndHandlePermission,
  };
};

export default useLogin;

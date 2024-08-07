import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayIcon,
  IPayImage,
  IPaySpinner,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayGradientText, IPayHeader } from '@app/components/molecules';
import IPayDelink from '@app/components/molecules/ipay-delink/ipay-delink.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet, IPayBottomSheet, IPayPasscode } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate, resetNavigation } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setToken } from '@app/network/client';
import loginViaPasscode from '@app/network/services/authentication/login-via-passcode/login-via-passcode.service';
import { OtpVerificationProps } from '@app/network/services/authentication/otp-verification/otp-verification.interface';
import { PrePareLoginApiResponseProps } from '@app/network/services/authentication/prepare-login/prepare-login.interface';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import deviceDelink from '@app/network/services/core/delink/delink.service';
import { IconfirmForgetPasscodeOtpReq } from '@app/network/services/core/forget-passcode/forget-passcode.interface';
import forgetPasscode from '@app/network/services/core/forget-passcode/forget-passcode.service';
import { ApiResponse, DeviceInfoProps } from '@app/network/services/services.interface';
import { encryptData } from '@app/network/utilities/encryption-helper';
import useActionSheetOptions from '@app/screens/delink/use-delink-options';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setAuth } from '@app/store/slices/auth-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import React, { useCallback, useRef, useState } from 'react';
import { setUserInfo } from '@app/store/slices/user-information-slice';
import ConfirmPasscodeComponent from '../forgot-passcode/confirm-passcode.compoennt';
import SetPasscodeComponent from '../forgot-passcode/create-passcode.component';
import { CallbackProps } from '../forgot-passcode/forget-passcode.interface';
import HelpCenterComponent from '../forgot-passcode/help-center.component';
import IdentityConfirmationComponent from '../forgot-passcode/identity-confirmation.component';
import OtpVerificationComponent from '../forgot-passcode/otp-verification.component';
import loginViaPasscodeStyles from './login-via-passcode.style';

const LoginViaPasscode: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { colors } = useTheme();
  const styles = loginViaPasscodeStyles(colors);
  const localizationText = useLocalization();
  const [, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<boolean>(false);
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const forgetPasswordBottomSheetRef = useRef(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);

  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { userInfo } = useTypedSelector((state) => state.userInfoReducer);
  const { showToast } = useToastContext();

  const onPressForgetPassword = () => {
    forgetPasswordBottomSheetRef.current?.present();
  };

  const onCallbackHandle = (data: CallbackProps) => {
    setComponentToRender(data.nextComponent);
    setForgetPasswordFormData((prevState) => ({
      ...prevState,
      ...data.data,
    }));
  };

  const renderToast = (apiError: string) => {
    showToast({
      title: localizationText.PROFILE.PASSCODE_ERROR || localizationText.api_request_failed,
      subTitle: apiError || localizationText.CARDS.VERIFY_CODE_ACCURACY,
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const redirectToResetConfirmation = () => {
    forgetPasswordBottomSheetRef.current?.close();
    setTimeout(() => {
      navigate(screenNames.PASSCODE_RECREATED);
    }, 0);
  };

  const resetPasscode = async () => {
    setIsLoading(true);
    const payload: IconfirmForgetPasscodeOtpReq = {
      poiNumber: encryptData(
        `${appData?.encryptionData?.passwordEncryptionPrefix}${forgetPasswordFormData.iqamaId}`,
        appData?.encryptionData?.passwordEncryptionKey as string,
      ) as string,
      otpRef: forgetPasswordFormData.otpRef,
      otp: forgetPasswordFormData.otp,
      walletNumber: forgetPasswordFormData.walletNumber,
      passCode: encryptData(
        `${appData?.encryptionData?.passwordEncryptionPrefix}${forgetPasswordFormData.passcode}`,
        appData?.encryptionData?.passwordEncryptionKey as string,
      ) as string,
      authentication: { transactionId: appData.transactionId as string },
      deviceInfo: appData.deviceInfo as DeviceInfoProps,
    };

    const apiResponse = await forgetPasscode(payload);
    if (apiResponse.status.type === 'SUCCESS') {
      redirectToResetConfirmation();
    }
    setIsLoading(false);
  };

  const handelPasscodeReacted = () => {
    redirectToResetConfirmation();
    // resetPasscode(); TODO: commenting api code for now for dummy testing
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    setTimeout(() => {
      setComponentToRender('');
    }, 500);
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const redirectToHome = () => {
    dispatch(setAppData({ isLinkedDevice: true }));
    dispatch(setAuth(true));
    resetNavigation(screenNames.HOME_BASE);
  };

  const loginUsingPasscode = async (
    prepareLoginApiResponse: ApiResponse<PrePareLoginApiResponseProps>,
    passcode: string,
  ) => {
    const payload: OtpVerificationProps = {
      password: encryptData(
        `${prepareLoginApiResponse?.response?.passwordEncryptionPrefix}${passcode}`,
        prepareLoginApiResponse?.response?.passwordEncryptionKey as string,
      ),
      username: encryptData(
        `${prepareLoginApiResponse?.response?.passwordEncryptionPrefix}${appData?.mobileNumber}`,
        prepareLoginApiResponse?.response?.passwordEncryptionKey as string,
      ),
      authentication: prepareLoginApiResponse?.authentication,
      deviceInfo: appData.deviceInfo,
    };

    const loginApiResponse = await loginViaPasscode(payload);
    if (loginApiResponse?.status?.type === 'SUCCESS') {
      setToken(loginApiResponse?.headers?.authorization);
      dispatch(setUserInfo({ profileImage: loginApiResponse?.response?.profileImage }));
      redirectToHome();
    } else if (loginApiResponse?.apiResponseNotOk) {
      setAPIError(localizationText.api_response_error);
    } else {
      setAPIError(loginApiResponse?.error);
    }
  };

  const login = async (passcode: string) => {
    setIsLoading(true);
    try {
      const prepareLoginApiResponse = await prepareLogin();
      if (prepareLoginApiResponse?.status.type === 'SUCCESS') {
        dispatch(
          setAppData({
            transactionId: prepareLoginApiResponse?.authentication?.transactionId,
            encryptionData: prepareLoginApiResponse?.response,
          }),
        );
        setToken(prepareLoginApiResponse?.headers?.authorization);
        await loginUsingPasscode(prepareLoginApiResponse, passcode);
      } else if (prepareLoginApiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.api_response_error);
      } else {
        setAPIError(prepareLoginApiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const delinkSuccessfullyDone = () => {
    navigate(screenNames.DELINK_SUCCESS);
  };

  const delinkDevice = async () => {
    actionSheetRef.current.hide();
    setIsLoading(true);
    try {
      const payload: DeviceInfoProps = {
        deviceInfo: appData.deviceInfo,
      };

      const apiResponse = await deviceDelink(payload);
      if (apiResponse?.ok) {
        delinkSuccessfullyDone();
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

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      if (passcodeError) setPasscodeError(false);
      setPasscode(newCode);
      if (newCode.length === 4) login(newCode);
    }
  };

  const renderForgetPasswordComponents = () => {
    const nextComp = constants.FORGET_PASSWORD_COMPONENTS;

    switch (componentToRender) {
      case nextComp.CONFIRM_OTP:
        return (
          <OtpVerificationComponent
            ref={otpVerificationRef}
            onCallback={onCallbackHandle}
            onPressHelp={handleOnPressHelp}
            iqamaId={forgetPasswordFormData.iqamaId}
            otpRef={forgetPasswordFormData.otpRef}
            transactionId={forgetPasswordFormData.transactionId}
            phoneNumber={userInfo?.mobileNumber}
          />
        );
      case nextComp.CREATE_PASSCODE:
        return <SetPasscodeComponent onCallback={onCallbackHandle} />;
      case nextComp.CONFIRM_PASSCODE:
        return (
          <ConfirmPasscodeComponent
            passcode={forgetPasswordFormData.passcode}
            passcodeReacted={handelPasscodeReacted}
          />
        );
      default:
        return <IdentityConfirmationComponent onCallback={onCallbackHandle} onPressHelp={handleOnPressHelp} />;
    }
  };

  const gradientColors = [colors.primary.primary500, colors.secondary.secondary300];

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleClose = () => {
    setIsAlertVisible(false);
  };
  const handleAlertOpen = () => {
    setIsAlertVisible(true);
  };

  const actionSheetRef = useRef<any>(null);

  const handleDelink = () => {
    setIsAlertVisible(false);
    setTimeout(() => {
      actionSheetRef.current.show();
    }, 500); // Delay for closinh alert
  };

  const hideDelink = () => {
    actionSheetRef.current.hide();
  };

  const delinkSuccessfully = useCallback((index: number) => {
    if (index == 1) {
      delinkDevice();
    } else {
      hideDelink();
    }
  }, []);

  // Using the useActionSheetOptions hook
  const actionSheetOptions = useActionSheetOptions(delinkSuccessfully);

  return (
    <IPaySafeAreaView>
      {isLoading && <IPaySpinner />}
      <IPayHeader isDelink languageBtn onPress={() => handleDelink()} />
      <IPayView style={styles.container}>
        <IPayView style={styles.imageParetntView}>
          <IPayImage image={images.profile} style={styles.image} />
        </IPayView>
        <IPayView style={styles.childContainer}>
          <IPayCaption1Text text={localizationText.LOGIN.WELCOME_BACK} style={styles.welcomeText} />
          {userInfo?.firstName && (
            <IPayGradientText
              text={userInfo.firstName}
              gradientColors={gradientColors}
              fontSize={styles.linearGradientText.fontSize}
              fontFamily={styles.linearGradientText.fontFamily}
              style={styles.gradientTextSvg}
            />
          )}

          <IPaySubHeadlineText
            regular
            color={colors.primary.primary800}
            style={styles.enterPasscodeText}
            text={localizationText.LOGIN.ENTER_YOUR_PASSCODE}
          />
        </IPayView>
        <IPayPasscode
          data={constants.DIALER_DATA}
          onEnterPassCode={onEnterPassCode}
          loginViaPasscode
          forgetPasswordBtn
          onPressForgetPassword={onPressForgetPassword}
          passcodeError={passcodeError}
        />
      </IPayView>
      <IPayBottomSheet
        noGradient
        heading={localizationText.FORGOT_PASSCODE.FORGET_PASSWORD}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '99%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={forgetPasswordBottomSheetRef}
      >
        {renderForgetPasswordComponents()}
      </IPayBottomSheet>

      <IPayBottomSheet
        noGradient
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '99%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>
      <IPayDelink onClose={handleClose} visible={isAlertVisible} delink={handleDelink} />
      <IPayActionSheet
        ref={actionSheetRef}
        testID="delink-action-sheet"
        title={actionSheetOptions.title}
        message={actionSheetOptions.message}
        options={actionSheetOptions.options}
        cancelButtonIndex={actionSheetOptions.cancelButtonIndex}
        destructiveButtonIndex={actionSheetOptions.destructiveButtonIndex}
        showIcon={actionSheetOptions.showIcon}
        showCancel={actionSheetOptions.showCancel}
        customImage={actionSheetOptions.customImage}
        onPress={delinkSuccessfully}
      />
    </IPaySafeAreaView>
  );
};

export default LoginViaPasscode;

import { IPayCaption1Text, IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';

import { IPayGradientText, IPayHeader, IPayUserAvatar } from '@app/components/molecules';
import IPayDelink from '@app/components/molecules/ipay-delink/ipay-delink.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet, IPayBottomSheet, IPayPasscode } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setToken } from '@app/network/client';
import loginViaPasscode from '@app/network/services/authentication/login-via-passcode/login-via-passcode.service';
import { OtpVerificationProps } from '@app/network/services/authentication/otp-verification/otp-verification.interface';
import { PrePareLoginApiResponseProps } from '@app/network/services/authentication/prepare-login/prepare-login.interface';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import useBiometricService from '@app/network/services/core/biometric/biometric-service';
import { DelinkPayload } from '@app/network/services/core/delink/delink-device.interface';
import deviceDelink from '@app/network/services/core/delink/delink.service';
import { IconfirmForgetPasscodeOtpReq } from '@app/network/services/core/forget-passcode/forget-passcode.interface';
import forgetPasscode from '@app/network/services/core/forget-passcode/forget-passcode.service';
import getWalletInfo from '@app/network/services/core/get-wallet/get-wallet.service';
import { ApiResponse, DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { encryptData } from '@app/network/utilities/encryption-helper';
import useActionSheetOptions from '@app/screens/delink/use-delink-options';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setAuth } from '@app/store/slices/auth-slice';
import { setUserInfo } from '@app/store/slices/user-information-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { spinnerVariant } from '@app/utilities/enums.util';
import icons from '@assets/icons';
import React, { useCallback, useRef, useState } from 'react';
import ConfirmPasscodeComponent from '../forgot-passcode/confirm-passcode.compoennt';
import SetPasscodeComponent from '../forgot-passcode/create-passcode.component';
import { CallbackProps } from '../forgot-passcode/forget-passcode.interface';
import HelpCenterComponent from '../forgot-passcode/help-center.component';
import IdentityConfirmationComponent from '../forgot-passcode/identity-confirmation.component';
import useLogin from './login-via-passcode.hook';
import loginViaPasscodeStyles from './login-via-passcode.style';

const LoginViaPasscode: React.FC = () => {
  const {
    onConfirm,
    otpError,
    setOtpError,
    setOtp,
    setOtpRef,
    otpVerificationRef,
    apiError,
    setComponentToRender,
    componentToRender,
    forgetPasswordFormData,
    setForgetPasswordFormData,
  } = useLogin();
  const dispatch = useTypedDispatch();
  const styles = loginViaPasscodeStyles();
  const { colors } = useTheme();
  const actionSheetRef = useRef<any>(null);
  const localizationText = useLocalization();
  const [, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const forgetPasswordBottomSheetRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);
  const { handleFaceID } = useBiometricService();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { userInfo } = useTypedSelector((state) => state.userInfoReducer);
  const { walletNumber } = userInfo;
  const { showToast } = useToastContext();
  const { savePasscodeState } = useBiometricService();
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { otpConfig } = useConstantData();

  const renderToast = (apiError: string) => {
    showToast({
      title: localizationText.PROFILE.PASSCODE_ERROR,
      subTitle: apiError || localizationText.CARDS.VERIFY_CODE_ACCURACY,
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

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

  const onPressForgetPassword = () => {
    setComponentToRender('');
    forgetPasswordBottomSheetRef.current?.present();
  };

  const onCallbackHandle = (data: CallbackProps) => {
    if (data?.data?.otpRef) {
      setOtpRef(data?.data?.otpRef);
    }
    setComponentToRender(data.nextComponent || '');
    setForgetPasswordFormData((prevState) => ({
      ...prevState,
      ...data.data,
    }));
  };

  const redirectToResetConfirmation = () => {
    forgetPasswordBottomSheetRef.current?.close();
    requestAnimationFrame(() => {
      navigate(screenNames.PASSCODE_RECREATED);
    });
  };

  const resetPasscode = async () => {
    renderSpinner(true);
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
    renderSpinner(false);
  };

  const handelPasscodeReacted = () => {
    resetPasscode();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const redirectToHome = (idExpired?: boolean) => {
    dispatch(setAppData({ isLinkedDevice: true }));
    dispatch(setAuth(true));
  };

  const getWalletInformation = async (idExpired?: boolean) => {
    // renderSpinner(true);
    try {
      const payload = {
        walletNumber,
      };

      const apiResponse = await getWalletInfo(payload, dispatch);

      if (apiResponse?.status?.type === 'SUCCESS') {
        redirectToHome(idExpired);
      } else {
        renderToast(localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
      renderSpinner(false);
    } catch (error) {
      renderSpinner(false);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const loginUsingPasscode = async (
    prepareLoginApiResponse: ApiResponse<PrePareLoginApiResponseProps>,
    passcode: string,
  ) => {
    const payload: OtpVerificationProps = {
      password:
        encryptData(
          `${prepareLoginApiResponse?.response?.passwordEncryptionPrefix}${passcode}`,
          prepareLoginApiResponse?.response?.passwordEncryptionKey as string,
        ) || '',
      username:
        encryptData(
          `${prepareLoginApiResponse?.response?.passwordEncryptionPrefix}${appData?.mobileNumber}`,
          prepareLoginApiResponse?.response?.passwordEncryptionKey as string,
        ) || '',
      authentication: prepareLoginApiResponse?.authentication,
      deviceInfo: appData.deviceInfo,
    };

    const loginApiResponse: any = await loginViaPasscode(payload);
    if (loginApiResponse?.status?.type === 'SUCCESS') {
      savePasscodeState(passcode);
      setToken(loginApiResponse?.headers?.authorization);
      dispatch(
        setAppData({
          loginData: loginApiResponse?.response,
        }),
      ),
        dispatch(setUserInfo({ profileImage: loginApiResponse?.response?.profileImage }));
      await getWalletInformation(loginApiResponse?.response?.idExpired);
    } else {
      setPasscodeError(true);
      renderToast(localizationText.ERROR.INVALID_PASSCODE);
    }
  };

  const login = async (passcode: string) => {
    renderSpinner(true);
    try {
      const prepareLoginApiResponse: any = await prepareLogin();
      if (prepareLoginApiResponse?.status.type === 'SUCCESS') {
        dispatch(
          setAppData({
            transactionId: prepareLoginApiResponse?.authentication?.transactionId,
            encryptionData: prepareLoginApiResponse?.response,
          }),
        );
        setToken(prepareLoginApiResponse?.headers?.authorization);
        await loginUsingPasscode(prepareLoginApiResponse, passcode);
      } else {
        renderToast(localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
      renderSpinner(false);
    } catch (error) {
      renderSpinner(false);
      renderToast(localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const onPressFaceID = async () => {
    const retrievedPasscode = await handleFaceID();

    if (retrievedPasscode) {
      await login(retrievedPasscode);
    }
  };

  const delinkSuccessfullyDone = () => {
    navigate(screenNames.DELINK_SUCCESS);
  };

  const delinkDevice = async () => {
    actionSheetRef.current.hide();
    renderSpinner(true);
    try {
      const delinkReqBody = await getDeviceInfo();
      const payload: DelinkPayload = {
        delinkReq: delinkReqBody,
        walletNumber,
      };

      const apiResponse: any = await deviceDelink(payload);
      if (apiResponse?.status?.type === 'SUCCESS') {
        delinkSuccessfullyDone();
      } else {
        renderToast(localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      renderToast(localizationText.ERROR.SOMETHING_WENT_WRONG);
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
          <IPayOtpVerification
            ref={otpVerificationRef}
            onPressConfirm={onConfirm}
            mobileNumber={userInfo?.mobileNumber}
            setOtp={setOtp}
            setOtpError={setOtpError}
            otpError={otpError}
            isLoading={isLoading}
            apiError={apiError}
            showHelp={true}
            title={localizationText.FORGOT_PASSCODE.RECIEVED_PHONE_CODE}
            handleOnPressHelp={handleOnPressHelp}
            timeout={otpConfig.forgetPasscode.otpTimeout}
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

  const gradientColors = [colors?.primary?.primary500, colors?.secondary?.secondary300];

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleClose = () => {
    setIsAlertVisible(false);
  };

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
    if (index === 1) {
      delinkDevice();
    } else {
      hideDelink();
    }
  }, []);

  // Using the useActionSheetOptions hook
  const actionSheetOptions = useActionSheetOptions(delinkSuccessfully);

  return (
    <IPaySafeAreaView>
      <>
        <IPayHeader isDelink languageBtn onPress={() => handleDelink()} />
        <IPayView style={styles.container}>
          <IPayView style={styles.imageParetntView}>
            <IPayUserAvatar style={styles.image} />
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
            onPressFaceID={onPressFaceID}
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
      </>
    </IPaySafeAreaView>
  );
};

export default LoginViaPasscode;

import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';

import { IPayGradientText, IPayHeader, IPayList, IPayUserAvatar } from '@app/components/molecules';
import IPayDelink from '@app/components/molecules/ipay-delink/ipay-delink.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet, IPayBottomSheet, IPayPasscode } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import constants, { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocation from '@app/hooks/location.hook';
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
import { WalletNumberProp } from '@app/network/services/core/get-wallet/get-wallet.interface';
import getWalletInfo from '@app/network/services/core/get-wallet/get-wallet.service';
import { ApiResponse, DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { encryptData } from '@app/network/utilities/encryption-helper';
import useActionSheetOptions from '@app/screens/delink/use-delink-options';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setAuth } from '@app/store/slices/auth-slice';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { onCall } from '@app/utilities/call-helper.util';
import { APIResponseType, spinnerVariant } from '@app/utilities/enums.util';
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
    setResendOtpPayload,
    resendForgetPasscodeOtp,
    otpVerificationRef,
    apiError,
    setComponentToRender,
    componentToRender,
    forgetPasswordFormData,
    setForgetPasswordFormData,
    checkAndHandlePermission,
  } = useLogin();
  const dispatch = useTypedDispatch();
  const { colors } = useTheme();
  const styles = loginViaPasscodeStyles(colors);
  const actionSheetRef = useRef<any>(null);
  const localizationText = useLocalization();
  const [, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<boolean>(false);

  const [showForgotSheet, setShowForgotSheet] = useState<boolean>(false);
  const helpCenterRef = useRef<any>(null);
  const { handleFaceID } = useBiometricService();

  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { walletNumber, mobileNumber, firstName } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { showToast } = useToastContext();
  const { savePasscodeState, resetBiometricConfig } = useBiometricService();
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { otpConfig, contactusList } = useConstantData();
  const contactUsRef = useRef<any>(null);

  const { fetchLocation } = useLocation();

  const renderToast = (apiError: string) => {
    setPasscodeError(true);
    showToast({
      title: localizationText.COMMON.INCORRECT_CODE,
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
    setShowForgotSheet(true);
  };

  const onCallbackHandle = (data: CallbackProps) => {
    if (data?.data?.otpRef) {
      setOtpRef(data?.data?.otpRef);
      setResendOtpPayload(data?.data?.resendOtpPayload);
    }
    setComponentToRender(data.nextComponent || '');
    setForgetPasswordFormData((prevState) => ({
      ...prevState,
      ...data.data,
    }));
  };

  const redirectToResetConfirmation = () => {
    setShowForgotSheet(false);
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

    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      resetBiometricConfig();
      savePasscodeState(forgetPasswordFormData.passcode);

      redirectToResetConfirmation();
    }
    renderSpinner(false);
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    setShowForgotSheet(false);
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const redirectToHome = () => {
    dispatch(setAppData({ isLinkedDevice: true }));
    dispatch(setAuth(true));
  };

  const saveProfileImage = (response: any) => {
    if (response?.profileImage) {
      dispatch(setWalletInfo({ profileImage: response?.profileImage }));
    }
  };

  const getWalletInformation = async (idExpired?: boolean, resWalletNumber?: string) => {
    renderSpinner(true);
    const payload: WalletNumberProp = {
      walletNumber: resWalletNumber as string,
    };

    const apiResponse: any = await getWalletInfo(payload);

    if (apiResponse) {
      dispatch(setWalletInfo(apiResponse?.response));
      saveProfileImage(apiResponse?.response);
      redirectToHome(idExpired);
    }
    renderSpinner(false);
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
      deviceInfo: { ...appData.deviceInfo, locationDetails: {} },
    };

    const loginApiResponse: any = await loginViaPasscode(payload);
    if (loginApiResponse?.status?.type === APIResponseType.SUCCESS) {
      savePasscodeState(passcode);
      setToken(loginApiResponse?.headers?.authorization);
      dispatch(
        setAppData({
          loginData: loginApiResponse?.response,
        }),
      );
      saveProfileImage(loginApiResponse?.response);
      await getWalletInformation(loginApiResponse?.response?.idExpired, loginApiResponse?.response?.walletNumber);
    }
  };

  const login = async (passcode: string) => {
    const hasLocation = await checkAndHandlePermission();
    if (!hasLocation) {
      setPasscodeError(true);
      return;
    }
    setPasscodeError(false);

    renderSpinner(true);
    const location = await fetchLocation();
    if (!location) {
      setPasscodeError(true);
      renderSpinner(false);
      return;
    }
    setPasscodeError(false);

    try {
      const deviceInfo = getDeviceInfo();
      const prepareLoginPayload: DeviceInfoProps = {
        ...deviceInfo,
        locationDetails: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      };

      const prepareLoginApiResponse: any = await prepareLogin(prepareLoginPayload);
      if (prepareLoginApiResponse?.status.type === APIResponseType.SUCCESS) {
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
    resetBiometricConfig();
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
      if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
        delinkSuccessfullyDone();
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
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
            mobileNumber={mobileNumber}
            setOtp={setOtp}
            setOtpError={setOtpError}
            otpError={otpError}
            apiError={apiError}
            showHelp
            title={localizationText.FORGOT_PASSCODE.RECIEVED_PHONE_CODE}
            handleOnPressHelp={handleOnPressHelp}
            timeout={otpConfig.forgetPasscode.otpTimeout}
            onResendCodePress={() => {
              resendForgetPasscodeOtp();
              otpVerificationRef?.current?.resetInterval();
            }}
          />
        );
      case nextComp.CREATE_PASSCODE:
        return <SetPasscodeComponent onCallback={onCallbackHandle} />;
      case nextComp.CONFIRM_PASSCODE:
        return <ConfirmPasscodeComponent passcode={forgetPasswordFormData.passcode} passcodeReacted={resetPasscode} />;
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
  const openContactUsBottomSheet = () => {
    contactUsRef.current.present();
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
      <IPayHeader isDelink languageBtn onPress={() => handleDelink()} />
      <IPayView style={styles.container}>
        <IPayView style={styles.imageParetntView}>
          <IPayUserAvatar style={styles.image} />
        </IPayView>
        <IPayView style={styles.childContainer}>
          <IPayCaption1Text text={localizationText.LOGIN.WELCOME_BACK} style={styles.welcomeText} />
          {firstName && (
            <IPayGradientText
              text={firstName}
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
      <IPayPortalBottomSheet
        noGradient
        heading={localizationText.FORGOT_PASSCODE.FORGET_PASSWORD}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        isVisible={showForgotSheet}
      >
        {renderForgetPasswordComponents()}
      </IPayPortalBottomSheet>

      <IPayBottomSheet
        noGradient
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '99%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent onPressContactUs={openContactUsBottomSheet} />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.COMMON.CONTACT_US}
        customSnapPoint={['1%', '45%']}
        ref={contactUsRef}
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayView style={styles.contactWrapper}>
          <IPayFootnoteText
            style={styles.headerStyle}
            text={localizationText.COMMON.ASSISTANCE}
            color={colors.primary.primary900}
          />
          <IPayCaption1Text text={localizationText.COMMON.CONTACT_SERVICE_TEAM} color={colors.natural.natural700} />
        </IPayView>
        <IPayView style={styles.contentContainer}>
          {contactusList.map((item) => (
            <IPayList
              key={item.title}
              title={item.title}
              isShowSubTitle
              subTitle={item.phone_number}
              isShowIcon
              icon={
                <IPayPressable style={styles.iconWrapper} onPress={() => onCall(item.phone_number)}>
                  <IPayIcon icon={icons.call_calling} size={18} color={colors.natural.natural0} />
                </IPayPressable>
              }
            />
          ))}
        </IPayView>
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

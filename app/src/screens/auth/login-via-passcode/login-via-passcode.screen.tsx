import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';

import { IPayGradientText, IPayHeader, IPayList, IPayUserAvatar } from '@app/components/molecules';
import IPayDelink from '@app/components/molecules/ipay-delink/ipay-delink.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet, IPayBottomSheet, IPayPasscode } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import constants, { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setToken } from '@app/network/client';
import loginViaPasscode from '@app/network/services/authentication/login-via-passcode/login-via-passcode.service';
import { OtpVerificationProps } from '@app/network/services/authentication/otp-verification/otp-verification.interface';
import { PrePareLoginApiResponseProps } from '@app/network/services/authentication/prepare-login/prepare-login.interface';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import useBiometricService from '@app/network/services/core/biometric/biometric-service';
import { IconfirmForgetPasscodeOtpReq } from '@app/network/services/core/forget-passcode/forget-passcode.interface';
import forgetPasscode from '@app/network/services/core/forget-passcode/forget-passcode.service';
import { ApiResponse, DeviceInfoProps } from '@app/network/services/services.interface';
import { encryptData, getDeviceInfo } from '@app/network/utilities';
import useActionSheetOptions from '@app/screens/delink/use-delink-options';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setAuth } from '@app/store/slices/auth-slice';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { openPhoneNumber } from '@app/utilities';
import { APIResponseType } from '@app/utilities/enums.util';
import icons from '@assets/icons';
import React, { useCallback, useRef, useState } from 'react';
import { TextStyle } from 'react-native';
import useDelinkDevice from '@app/hooks/useDeviceDelink';
import IPayLocationPermissionSheet from '@app/components/organism/ipay-location-permission-sheet/ipay-location-permission-sheet.component';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { showPermissionModal } from '@app/store/slices/permission-alert-slice';
import { editSessionTime } from '@app/store/slices/idle-timer-slice';
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
    setComponentToRender,
    componentToRender,
    forgetPasswordFormData,
    setForgetPasswordFormData,
    otp,
  } = useLogin();
  const dispatch = useTypedDispatch();
  const { colors } = useTheme();
  const styles = loginViaPasscodeStyles(colors);
  const actionSheetRef = useRef<any>(null);
  const [passcodeError, setPasscodeError] = useState<boolean>(false);

  const [showForgotSheet, setShowForgotSheet] = useState<boolean>(false);
  const helpCenterRef = useRef<any>(null);
  const { handleFaceID } = useBiometricService();
  const { delinkDevice } = useDelinkDevice({ shouldNavigate: true });

  const appData = useTypedSelector((state) => state.appDataReducer.appData);
  const { mobileNumber, firstName, fatherName } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { showToast } = useToastContext();
  const { savePasscodeState, resetBiometricConfig } = useBiometricService();
  const { otpConfig, contactusList } = useConstantData();
  const contactUsRef = useRef<any>(null);
  const [location, setLocation] = useState<GeoCoordinates | null>(null);

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
      redirectToHome();
      return;
    }

    setPasscodeError(true);
  };

  const login = async (passcode: string) => {
    if (!location?.latitude || !location?.longitude) {
      dispatch(showPermissionModal());
      setPasscodeError(true);
      return;
    }
    setPasscodeError(false);

    try {
      const deviceInfo = getDeviceInfo();
      const prepareLoginPayload: DeviceInfoProps = {
        ...deviceInfo,
        locationDetails: {
          latitude: `${location.latitude}`,
          longitude: `${location.longitude}`,
        },
      };

      const prepareLoginApiResponse = await prepareLogin(prepareLoginPayload);

      if (prepareLoginApiResponse?.status.type === APIResponseType.SUCCESS) {
        const inactiveTimeoutPeriodInMins =
          Number(prepareLoginApiResponse?.response?.inactiveTimeoutPeriodInMins) - 1.5;
        dispatch(editSessionTime(inactiveTimeoutPeriodInMins));
        dispatch(
          setAppData({
            transactionId: prepareLoginApiResponse?.authentication?.transactionId,
            encryptionData: prepareLoginApiResponse?.response,
          }),
        );
        setToken(prepareLoginApiResponse?.headers?.authorization);
        await loginUsingPasscode(prepareLoginApiResponse, passcode);
      }
    } catch (error) {
      setPasscodeError(true);
    }
  };

  const onPressFaceID = async () => {
    const retrievedPasscode = await handleFaceID();

    if (retrievedPasscode) {
      await login(retrievedPasscode);
    }
  };

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      if (passcodeError) setPasscodeError(false);
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
            otp={otp}
            showHelp
            title="FORGOT_PASSCODE.RECIEVED_PHONE_CODE"
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

  const delinkSuccessfully = useCallback((index?: number) => {
    hideDelink();
    if (index === 1) {
      delinkDevice();
    }
  }, []);

  // Using the useActionSheetOptions hook
  const actionSheetOptions = useActionSheetOptions(delinkSuccessfully);

  const onCall = (phoneNumber: string) => {
    openPhoneNumber({ phoneNumber, colors, showToast });
  };

  const onLocationSelected = useCallback((position: GeoCoordinates) => {
    setLocation(position);
  }, []);

  return (
    <IPaySafeAreaView>
      <IPayHeader isDelink languageBtn onPress={() => handleDelink()} />
      <IPayView style={styles.container}>
        <IPayView style={styles.imageParetntView}>
          <IPayUserAvatar style={styles.image} />
        </IPayView>
        <IPayView style={styles.childContainer}>
          <IPayCaption1Text text="LOGIN.WELCOME_BACK" style={styles.welcomeText} />
          {firstName && (
            <IPayGradientText
              text={`${firstName} ${fatherName || ''}`}
              shouldTranslate={false}
              gradientColors={gradientColors}
              yScale={12}
              fontSize={(styles.linearGradientText as TextStyle)?.fontSize}
              fontFamily={(styles.linearGradientText as TextStyle)?.fontFamily}
              style={styles.gradientTextSvg}
            />
          )}

          <IPaySubHeadlineText
            regular
            color={colors.primary.primary800}
            style={styles.enterPasscodeText}
            text="LOGIN.ENTER_YOUR_PASSCODE"
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
        heading="FORGOT_PASSCODE.FORGET_PASSWORD"
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
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '99%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent onPressContactUs={openContactUsBottomSheet} hideFAQError />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading="COMMON.CONTACT_US"
        customSnapPoint={['1%', '45%']}
        ref={contactUsRef}
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayView style={styles.contactWrapper}>
          <IPayFootnoteText style={styles.headerStyle} text="COMMON.ASSISTANCE" color={colors.primary.primary900} />
          <IPayCaption1Text text="COMMON.CONTACT_SERVICE_TEAM" color={colors.natural.natural700} />
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
      <IPayLocationPermissionSheet onLocationSelected={onLocationSelected} />
    </IPaySafeAreaView>
  );
};

export default LoginViaPasscode;

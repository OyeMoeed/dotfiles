import images from '@app/assets/images';
import { IPayCaption1Text, IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayGradientText, IPayHeader } from '@app/components/molecules';
import { IPayActionSheet, IPayBottomSheet, IPayPasscode } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useCallback, useRef, useState } from 'react';
import ConfirmPasscodeComponent from '../forgot-passcode/confirm-passcode.compoennt';
import SetPasscodeComponent from '../forgot-passcode/create-passcode.component';
import { CallbackProps } from '../forgot-passcode/forget-passcode.interface';
import HelpCenterComponent from '../forgot-passcode/help-center.component';
import IdentityConfirmationComponent from '../forgot-passcode/identity-conirmation.component';
import OtpVerificationComponent from '../forgot-passcode/otp-verification.component';
import loginViaPasscodeStyles from './login-via-passcode.style';
import IPayDelink from '@app/components/molecules/ipay-delink/ipay-delink.component';
import useActionSheetOptions from '@app/screens/delink/use-delink-options';

const LoginViaPasscode: React.FC = () => {
  const { colors } = useTheme();
  const styles = loginViaPasscodeStyles(colors);
  const localizationText = useLocalization();
  const [pascode, setPasscode] = useState<string>('');
  const [passcodeError, setPassCodeError] = useState<boolean>(false);
  const [componentToRender, setComponentToRender] = useState<string>('');
  const [forgetPasswordFormData, setForgetPasswordFormData] = useState({
    iqamaId: '',
    otp: '',
    passcode: '',
    confirmPasscode: '',
  });
  const forgetPasswordBottomSheetRef = useRef(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);

  const onCodeFilled = (newCode: string) => {};

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      if (passcodeError) setPassCodeError(false);
      setPasscode(newCode);
      if (newCode.length === 4) onCodeFilled(newCode);
    }
  };
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

  const handelPasscodeReacted = () => {
    forgetPasswordBottomSheetRef.current?.close();
    setTimeout(() => {
      navigate(screenNames.PASSCODE_RECREATED);
    }, 100);
 
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

  const renderForgetPasswordComponents = () => {
    const nextComp = constants.FORGET_PASSWORD_COMPONENTS;

    switch (componentToRender) {
      case nextComp.CONFIRM_OTP:
        return (
          <OtpVerificationComponent
            ref={otpVerificationRef}
            onCallback={onCallbackHandle}
            onPressHelp={handleOnPressHelp}
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

  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleClose = () => {
    setAlertVisible(false);
  };
  const handleAlertOpen = () => {
    setAlertVisible(true);
  };

  const actionSheetRef = useRef<any>(null);

  const handleDelink = () => {
    setAlertVisible(false);
    setTimeout(() => {
      actionSheetRef.current.show();
    }, 500); // Delay for closinh alert
  };


  const hideDelink = () => {
    setAlertVisible(false);
    setTimeout(() => {
      actionSheetRef.current.hide();
    }, 500); // Delay for closinh alert
  };

  const delinkSuccessfullyDone = () => {
    navigate(screenNames.DELINK_SUCCESS);
  };

  const delinkSuccessfully = useCallback(
    (index: number) => {
      switch (index) {
        case 1:
          delinkSuccessfullyDone();
          break;
        case 2:
          hideDelink();
          break;
        default:
          break;
      }
    },
    [],
  );

  

  // Using the useActionSheetOptions hook
  const actionSheetOptions = useActionSheetOptions(delinkSuccessfully);

  return (
    <IPaySafeAreaView>
      <IPayHeader isDelink languageBtn onPress={() => handleAlertOpen()} />
      <IPayView style={styles.container}>
        <IPayView style={styles.imageParetntView}>
          <IPayImage image={images.profile} style={styles.image} />
        </IPayView>
        <IPayView style={styles.childContainer}>
          <IPayCaption1Text text={localizationText.welcome_back} style={styles.welcomeText} />
          <IPayGradientText
            text="Adam Ahmed"
            gradientColors={gradientColors}
            fontSize={styles.linearGradientText.fontSize}
            fontFamily={styles.linearGradientText.fontFamily}
            style={styles.gradientTextSvg}
          />

          <IPaySubHeadlineText
            regular
            color={colors.primary.primary800}
            style={styles.enterPasscodeText}
            text={localizationText.enter_your_passcode}
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
        heading={localizationText.forget_password}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={forgetPasswordBottomSheetRef}
      >
        {renderForgetPasswordComponents()}
      </IPayBottomSheet>

      <IPayBottomSheet
        heading={localizationText.help_center}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '100%']}
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

import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayOtpInputText, IPayPageDescriptionText } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { SetPasscodeComponentProps } from './forget-passcode.interface';
import otpStyles from './otp-verification.stlye';

const OtpVerificationComponent: React.FC = forwardRef<{}, SetPasscodeComponentProps>(
  ({ testID, phoneNumber = 'XXXXX0302', onCallback, onPressHelp }, ref) => {
    const tempOtp = '1234';
    const { colors } = useTheme();
    const localizationText = useLocalization();
    const styles = otpStyles(colors);
    const [otp, setOtp] = useState<string>('');
    const [otpError, setOtpError] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null);
    const initialTime = 60; // 1 minute in seconds
    const [counter, setCounter] = useState(initialTime);

    useEffect(() => {
      timerRef.current = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 0) {
            return 0; // Reset the counter when it reaches 0
          }
          return prevCounter - 1; // Decrement the counter
        });
      }, 1000);
      return () => clearInterval(timerRef.current); // Cleanup the timer on component unmount
    }, []);

    const resetInterval = () => {
      clearInterval(timerRef.current);
    };

    useImperativeHandle(ref, () => ({
      resetInterval,
    }));

    const format = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleRestart = () => {
      setCounter(initialTime); // Restart the timer by resetting the counter
    };

    const handleOnPressHelp = () => {
      if (onPressHelp) onPressHelp();
    };

    /// / This will handle API call and then show error message
    const onConfirm = () => {
      if (otp !== tempOtp) {
        setOtpError(true);
      } else if (onCallback)
        onCallback({ nextComponent: constants.FORGET_PASSWORD_COMPONENTS.CREATE_PASSCODE, data: { otp } });
    };

    const onChangeText = (text: string) => {
      setOtp(text);
      setOtpError(false);
    };

    return (
      <IPayView testID={testID} style={[styles.otpStylesContainer]}>
        <IPayView style={styles.messageIconView}>
          <icons.message width={scale(40)} height={verticalScale(40)} />
        </IPayView>
        <IPayView style={styles.headingView}>
          <IPayPageDescriptionText
            heading={localizationText.enter_received_code}
            text={`${localizationText.enter_four_digit_otp} ${phoneNumber}`}
          />
        </IPayView>

        <IPayOtpInputText isError={otpError} onChangeText={onChangeText} />

        <IPayCaption1Text regular style={styles.timerText} color={colors.natural.natural500}>
          {localizationText.code_expires_in + format(counter)}
        </IPayCaption1Text>

        <IPayButton
          disabled={counter > 0}
          btnType="link-button"
          btnText={localizationText.send_code_again}
          small
          btnStyle={styles.sendCodeBtnStyle}
          rightIcon={<IPayIcon icon={icons.refresh} size={14} color={colors.primary.primary500} />}
          onPress={handleRestart}
        />
        <IPayButton btnType="primary" btnText={localizationText.confirm} large btnIconsDisabled onPress={onConfirm} />

        <IPayButton
          onPress={handleOnPressHelp}
          btnType="link-button"
          btnText={localizationText.need_help}
          large
          btnStyle={styles.needHelpBtn}
          rightIcon={<IPayIcon icon={icons.messageQuestion} size={20} color={colors.primary.primary500} />}
        />
      </IPayView>
    );
  },
);

export default OtpVerificationComponent;

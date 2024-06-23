import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayOtpInputText, IPayPageDescriptionText } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IPayOtpVerificationProps } from './ipay-otp-verification.interface';
import otpVerificationStyles from './ipay-otp-verification.style';
import { Message } from '@app/assets/svgs';

const IPayOtpVerification: React.FC = forwardRef<{}, IPayOtpVerificationProps>(
  ({ testID, phoneNumber = 'XXXXX0302', onPressConfirm }, ref) => {
    const otpTemp = '1234';
    const { colors } = useTheme();
    const localizationText = useLocalization();
    const styles = otpVerificationStyles(colors);
    const [otp, setOtp] = useState<string>('');
    const [otpError, setOtpError] = useState<boolean>(false);
    const initialTime = constants.INITIAL_TIMER; // 1 minute in seconds
    const [counter, setCounter] = useState(initialTime);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
      timerRef.current = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 0) {
            clearInterval(timerRef.current); // Stop the timer when it reaches 0
            return 0; // Reset the counter
          }
          return prevCounter - 1; // Decrement the counter
        });
      }, 1000);

      return () => {
        clearInterval(timerRef.current); // Cleanup the timer on component unmount
      };
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

    /// / This will handle API call and then show error message
    const onConfirm = () => {
      if (otp !== otpTemp) {
        setOtpError(true);
      } else if (onPressConfirm) onPressConfirm();
    };

    const onChangeText = (text: string) => {
      setOtp(text);
      setOtpError(false);
    };

    return (
      <IPayView testID={testID} style={styles.container}>
        <IPayView style={styles.messageIconView}>
          <Message />
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
      </IPayView>
    );
  },
);

export default IPayOtpVerification;



import { IPayCaption1Text, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayButton, IPayOtpInputText, IPayPageDescriptionText } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import axios from 'axios';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import otpStyles from './add.passcode.stlye';
import { IPayOtpVerificationProps } from './ipay-otp-verification.interface';
import icons from '@app/assets/icons';

const OtpVerification = forwardRef<{}, IPayOtpVerificationProps>(
  ({ testID, onPressConfirm }, ref) => {
    const { colors } = useTheme();
    const localizationText = useLocalization();
    const styles = otpStyles(colors);

    const [otpDetails, setOtpDetails] = useState<{ otp: string; phoneNumber: string }>({ otp: '', phoneNumber: '' });
    const [otpError, setOtpError] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(60);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    let timer: any = null;

    useImperativeHandle(ref, () => ({
      resetInterval
    }));

    const fetchOtpDetails = async () => {
      try {
        const response = await axios.get('https://mocki.io/v1/fab10263-bdea-4de6-8e6b-0ee42c407426');
        setOtpDetails(response.data);
      } catch (error) {
        setAlertMessage('Error fetching OTP details. Please try again later.');
        setShowAlert(true);
      }
    };

    useEffect(() => {
      fetchOtpDetails();

      timer = setInterval(() => {
        setCounter(prev => (prev > 0 ? prev - 1 : prev));
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const resetInterval = () => {
      clearInterval(timer);
    };

    const format = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleRestart = () => {
      setCounter(60);
    };

    const onCodeFilled = (enteredOtp: string) => {
      if (enteredOtp !== otpDetails.otp) {
        setOtpError(true);
      }
    };

    const onCodeChanged = () => {
      if (otpError) setOtpError(false);
    };

    return (
      <IPayView testID={`${testID}-add-passcode`} style={styles.container}>
        <IPayView style={styles.messageIconView}>
          <icons.message width={scale(40)} height={verticalScale(40)} />
        </IPayView>
        <IPayView style={styles.headingView}>
          <IPayPageDescriptionText
            heading={localizationText.enter_received_code}
            text={`${localizationText.enter_four_digit_otp} ${otpDetails.phoneNumber}`}
          />
        </IPayView>

        <IPayView style={styles.otpView}>
          <IPayOtpInputText isError={otpError} onCodeFilled={onCodeFilled} onCodeChanged={onCodeChanged} />
        </IPayView>

        <IPayCaption1Text regular style={styles.timerText} color={colors.natural.natural500}>
          {localizationText.code_expires_in + ' ' + format(counter)}
        </IPayCaption1Text>

        <IPayButton
          disabled={counter > 0}
          btnType="link-button"
          btnText={localizationText.send_code_again}
          small
          btnStyle={styles.sendCodeBtnStyle}
          rightIcon={<icons.refresh width={scale(14)} height={verticalScale(14)} />}
          onPress={handleRestart}
        />
        <IPayButton
          btnType="primary"
          btnText={localizationText.confirm}
          large
          btnIconsDisabled
          onPress={onPressConfirm}
        />
        <IPayAlert
          visible={showAlert}
          title="Error"
          message={alertMessage}
          primaryAction={{ text: 'OK', onPress: () => setShowAlert(false) }}
        />
      </IPayView>
    );
  }
);

export default OtpVerification;



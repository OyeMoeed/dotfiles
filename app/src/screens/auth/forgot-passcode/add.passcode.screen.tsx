

import { IPayCaption1Text, IPayImage, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayButton, IPayOtpInputText, IPayPageDescriptionText } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import axios from 'axios';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import images from '@app/assets/images';
import icons from '@app/assets/icons';
import otpStyles from './add.passcode.stlye';
import { IPayOtpVerificationProps } from './forget-passcode.interface';

const OtpVerification = forwardRef<{}, IPayOtpVerificationProps>(({ testID, onPressConfirm }, ref) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = otpStyles(colors);

  const [otpDetails, setOtpDetails] = useState<{ otp: string; phoneNumber: string }>({ otp: '', phoneNumber: '' });
  const [otpError, setOtpError] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(120);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  let timer: any = null;

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

  useImperativeHandle(ref, () => ({
    resetInterval,
  }));

  const format = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleRestart = () => {
    setCounter(60);
  };

  const onCodeChanged = () => {
    if (otpError) setOtpError(false);
  };

  const onCodeFilled = (enteredOtp: string) => {
    onCodeChanged();
    if (enteredOtp.length === 4) {
      if (enteredOtp !== otpDetails.otp) {
        setOtpError(true);
      }
    }
  };

  return (
    <IPayView testID={`${testID}-add-passcode`} style={styles.container}>
      <IPayView style={styles.messageIconView}>
        <icons.message width={scale(40)} height={verticalScale(40)} />
      </IPayView>
      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText
          heading={localizationText.COMMON.ENTER_RECEIVED_CODE}
          text={`${localizationText.COMMON.ENTER_FOUR_DIGIT_OTP} ${otpDetails.phoneNumber}`}
        />
      </IPayView>

      <IPayView style={styles.otpView}>
        <IPayOtpInputText isError={otpError} onChangeText={onCodeFilled} />
      </IPayView>

      <IPayCaption1Text regular style={styles.timerText} color={colors.natural.natural500}>
        {`${localizationText.COMMON.CODE_EXPIRES_IN} ${format(counter)}`}
      </IPayCaption1Text>

      <IPayButton
        disabled={counter > 0}
        btnType="link-button"
        btnText={localizationText.COMMON.SEND_CODE_AGAIN}
        small
        btnStyle={styles.sendCodeBtnStyle}
        rightIcon={
          <IPayImage
            image={images.refresh}
            style={[
              styles.refreshIconStyle,
              {
                tintColor: counter > 0 ? colors.natural.natural300 : colors.primary.primary500,
              },
            ]}
          />
        }
        onPress={handleRestart}
      />
      <IPayButton
        btnType="primary"
        btnText={localizationText.COMMON.CONFIRM}
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



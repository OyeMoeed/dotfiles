import icons from '@app/assets/icons';
import { Message } from '@app/assets/svgs';
import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayOtpInputText, IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useLocalization from '@app/localization/hooks/localization.hook';
import { OtpVerificationProps } from '@app/network/services/authentication/otp-verification/otp-verification.interface';
import otpVerification from '@app/network/services/authentication/otp-verification/otp-verification.service';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { IPayOtpVerificationProps } from './ipay-otp-verification.interface';
import otpVerificationStyles from './ipay-otp-verification.style';

const IPayOtpVerification = forwardRef<{}, IPayOtpVerificationProps>(
  ({ testID, phoneNumber = 'XXXXX0302', onPressConfirm, mobileNumber, iqamaId }, ref) => {
    const dispatch = useTypedDispatch();
    const { appData } = useTypedSelector((state) => state.appDataReducer);
    const { colors } = useTheme();
    const localizationText = useLocalization();
    const styles = otpVerificationStyles(colors);
    const [otp, setOtp] = useState<string>('');
    const [apiError, setAPIError] = useState<string>('');
    const [otpError, setOtpError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let timer: any = null;
    const initialTime = 120; // 1 minute in seconds
    const [counter, setCounter] = useState(initialTime);
    const { showToast } = useToastContext();

    const renderToast = (toastMsg: string) => {
      showToast({
        title: toastMsg || localizationText.api_request_failed,
        subTitle: apiError || localizationText.otp_code_error_message,
        borderColor: colors.error.error25,
        isBottomSheet: true,
        leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
      });
    };

    useEffect(() => {
      timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 0) {
            return 0; // Reset the counter when it reaches 0
          }
          return prevCounter - 1; // Decrement the counter
        });
      }, 1000);
      return () => clearInterval(timer); // Cleanup the timer on component unmount
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
      setCounter(initialTime); // Restart the timer by resetting the counter
    };

    const onChangeText = (text: string) => {
      setOtp(text);
      setOtpError(false);
    };

    const verifyOtp = async () => {
      setIsLoading(true);
      try {
        const payload: OtpVerificationProps = {
          username: mobileNumber,
          poi: iqamaId,
          otp,
          otpRef: otp,
          authentication: appData.transactionId,
          deviceInfo: appData.deviceInfo,
        };

        const apiResponse = await otpVerification(payload, dispatch);
        if (apiResponse?.ok) {
          if (onPressConfirm) onPressConfirm();
        } else if (apiResponse?.apiResponseNotOk) {
          setAPIError(localizationText.api_response_error);
        } else {
          setAPIError(apiResponse?.error);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setAPIError(error?.message || localizationText.something_went_wrong);
        renderToast(error?.message || localizationText.something_went_wrong);
      }
    };

    /// / This will handle API call and then show error message
    const onConfirm = () => {
      if (otp === '') {
        setOtpError(true);
        renderToast(localizationText.otp_code_error);
      } else {
        verifyOtp();
      }
    };

    return (
      <IPayView testID={testID} style={styles.container}>
        {isLoading && <ActivityIndicator color={colors.primary.primary500} />}

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

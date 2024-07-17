import { IPayCaption1Text, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayOtpInputText, IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { OTPVerificationRefTypes, SetPasscodeComponentProps } from './forget-passcode.interface';
import otpStyles from './otp-verification.stlye';

const OtpVerificationComponent = forwardRef<{}, SetPasscodeComponentProps>(
  ({ testID, phoneNumber = 'XXXXX0302', onCallback, onPressHelp, onConfirmPress, showVerify }, ref) => {
    const tempOtp = '1234';
    const { colors } = useTheme();
    const localizationText = useLocalization();
    const styles = otpStyles(colors);
    const [otp, setOtp] = useState<string>('');
    const [otpError, setOtpError] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null);
    const initialTime = 120; // 1 minute in seconds
    const [counter, setCounter] = useState(initialTime);
    const { showToast } = useToastContext();

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

    const renderToast = (toastMsg?: string) => {
      showToast({
        title: toastMsg || localizationText.COMMON.INCORRECT_CODE,
        subTitle: localizationText.COMMON.,
        borderColor: colors.error.error25,
        isBottomSheet: true,
        isShowRightIcon: false,
        leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
      });
    };

    /// / This will handle API call and then show error message
    const onConfirm = () => {
      if (otp !== tempOtp) {
        setOtpError(true);
        renderToast();
      } else if (onCallback)
        onCallback({ nextComponent: constants.FORGET_PASSWORD_COMPONENTS.CREATE_PASSCODE, data: { otp } });
      else if (onConfirmPress) {
        onConfirmPress();
      }
    };

    const onChangeText = (text: string) => {
      setOtp(text);
      setOtpError(false);
    };



    const replaceFirstSixWithX = (input: string): string => 'XXXXXX' + input.slice(6);

    return (
      <IPayView testID={testID} style={styles.otpStylesContainer}>
        <IPayScrollView>
          <>
            <IPayView style={styles.messageIconView}>
              <icons.message width={scale(40)} height={verticalScale(40)} />
            </IPayView>
            <IPayView style={styles.headingView}>
              <IPayPageDescriptionText
                heading={localizationText.COMMON.ENTER_RECEIVED_CODE}
                text={`${localizationText.COMMON.ENTER_FOUR_DIGIT_OTP} ${replaceFirstSixWithX(phoneNumber)}`}
              />
            </IPayView>

            <IPayOtpInputText isError={otpError} onChangeText={onChangeText} />

            <IPayCaption1Text regular style={styles.timerText} color={colors.natural.natural500}>
              {`${localizationText.COMMON.CODE_EXPIRES_IN} ${format(counter)}`}
            </IPayCaption1Text>

            <IPayButton
              disabled={counter > 0}
              btnType="link-button"
              btnText={localizationText.COMMON.SEND_CODE_AGAIN}
              small
              btnStyle={styles.sendCodeBtnStyle}
              rightIcon={<IPayIcon icon={icons.refresh} size={14} color={colors.primary.primary500} />}
              onPress={handleRestart}
            />
            <IPayButton
              btnType="primary"
              btnText={localizationText.COMMON.CONFIRM}
              large
              btnIconsDisabled
              onPress={onConfirm}
            />

            {showVerify && (
              <IPayView style={styles.verifyView}>
                <IPayView style={styles.verifyViewRow}>
                  <IPayIcon icon={icons.info_circle} color={colors.natural.natural700} />
                  <IPayCaption1Text regular style={styles.verifyText} color={colors.primary.primary800}>
                    {localizationText.ID_RENEWAL.WHY_VERIFY_TITLE}
                  </IPayCaption1Text>
                </IPayView>

                <IPayCaption1Text regular style={styles.verifyText} color={colors.natural.natural700}>
                  {localizationText.ID_RENEWAL.WHY_VERIFY}
          <IPayCaption1Text regular style={styles.timerText} color={colors.natural.natural500}>
            {localizationText.COMMON.CODE_EXPIRES_IN + format(counter)}
          </IPayCaption1Text>

          <IPayButton
            disabled={counter > 0}
            btnType="link-button"
            btnText={localizationText.COMMON.SEND_CODE_AGAIN}
            small
            btnStyle={styles.sendCodeBtnStyle}
            rightIcon={<IPayIcon icon={icons.refresh} size={14} color={colors.primary.primary500} />}
            onPress={handleRestart}
          />
          <IPayButton
            btnType="primary"
            btnText={localizationText.COMMON.CONFIRM}
            large
            btnIconsDisabled
            onPress={onConfirm}
          />

          {showVerify && (
            <IPayView style={styles.verifyView}>
              <IPayView style={styles.verifyViewRow}>
                <IPayIcon icon={icons.info_circle} color={colors.natural.natural700} />
                <IPayCaption1Text regular style={[styles.verifyText]} color={colors.primary.primary800}>
                  {localizationText.ID_RENEWAL.WHY_VERIFY_TITLE}
                </IPayCaption1Text>
              </IPayView>
            )}
            <IPayButton
              onPress={handleOnPressHelp}
              btnType="link-button"
              btnText={localizationText.COMMON.NEED_HELP}
              large
              btnStyle={styles.needHelpBtn}
              rightIcon={<IPayIcon icon={icons.messageQuestion} size={20} color={colors.primary.primary500} />}
            />
          </>
        </IPayScrollView>
      </IPayView>
    );
  },
);

export default IPayOtpVerificationComponent;

import { IPayCaption1Text, IPayIcon, IPayImage, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayOtpInputText, IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { validateForgetPasscodeOtp } from '@app/network/services/core/prepare-forget-passcode/prepare-forget-passcode.service';
import { validateForgetPasscodeOtpReq } from '@app/network/services/core/prepare-forget-passcode/prepare-forget-passcode.interface';
import { useTypedSelector } from '@app/store/store';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { scaleSize } from '@app/styles/mixins';
import { isIosOS } from '@app/utilities/constants';
import images from '@app/assets/images';
import { SetPasscodeComponentProps } from './forget-passcode.interface';
import otpStyles from './otp-verification.stlye';

const OtpVerificationComponent: React.FC<SetPasscodeComponentProps> = forwardRef<{}, SetPasscodeComponentProps>(
  ({ testID, phoneNumber = 'XXXXX0302', onCallback, onPressHelp, showVerify, iqamaId, transactionId, otpRef }, ref) => {
    const { colors } = useTheme();
    const localizationText = useLocalization();
    const styles = otpStyles();
    const [otp, setOtp] = useState<string>('');
    const [otpError, setOtpError] = useState<boolean>(false);
    const timerRef = useRef<any>(null);
    const initialTime = 120; // 1 minute in seconds
    const [counter, setCounter] = useState(initialTime);
    const { showToast } = useToastContext();
    const { appData } = useTypedSelector((state) => state.appDataReducer);

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
        subTitle: localizationText.COMMON.PLEASE_VERIFY_CODE,
        borderColor: colors.error.error25,
        isBottomSheet: true,
        isShowRightIcon: false,
        leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
        containerStyle: { bottom: isIosOS ? scaleSize(80) : scaleSize(24) },
      });
    };

    const validateOtp = async () => {
      const body: validateForgetPasscodeOtpReq = {
        poiNumber: encryptData(
          `${appData?.encryptionData?.passwordEncryptionPrefix}${iqamaId as string}`,
          appData?.encryptionData?.passwordEncryptionKey as string,
        ) as string,
        otp,
        otpRef: otpRef as string,
        authentication: { transactionId: transactionId as string },
        deviceInfo: appData.deviceInfo as DeviceInfoProps,
      };
      const validateOtpRes = await validateForgetPasscodeOtp(body);
      if (validateOtpRes.status.type === 'SUCCESS') {
        if (onCallback)
          onCallback({
            nextComponent: constants.FORGET_PASSWORD_COMPONENTS.CREATE_PASSCODE,
            data: { otp, walletNumber: validateOtpRes?.response?.walletNumber },
          });
      } else {
        setOtpError(true);
        renderToast();
      }
    };

    const onConfirm = () => {
      validateOtp();
    };

    const onChangeText = (text: string) => {
      setOtp(text);
      setOtpError(false);
    };

    const replaceFirstSixWithX = (input: string): string => `XXXXXX${input.slice(6)}`;

    return (
      <IPayView testID={testID} style={styles.otpStylesContainer}>
        <IPayScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle}>
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

            <IPayView>
              <IPayOtpInputText isError={otpError} onChangeText={onChangeText} />
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

export default OtpVerificationComponent;

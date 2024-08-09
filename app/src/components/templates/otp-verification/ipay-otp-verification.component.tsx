import icons from '@app/assets/icons';
import { Message } from '@app/assets/svgs';
import { IPayCaption1Text, IPayIcon, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayButton, IPayOtpInputText, IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { formatTime } from '@app/utilities/date-helper.util';
import { hideContactNumber } from '@app/utilities/shared.util';
import { useOtpVerification } from './ipay-otp-verification.hook';
import IPayOtpVerificationProps from './ipay-otp-verification.interface';
import otpVerificationStyles from './ipay-otp-verification.style';

const IPayOtpVerification = forwardRef<{}, IPayOtpVerificationProps>(
  (
    {
      testID,
      onPressConfirm,
      mobileNumber,
      setOtp,
      setOtpError,
      otpError,
      isLoading,
      apiError,
      isBottomSheet = true,
      handleOnPressHelp,
      showHelp = true,
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const localizationText = useLocalization();
    const styles = otpVerificationStyles(colors);
    const { showToast } = useToastContext();
    const { counter, handleRestart, onChangeText } = useOtpVerification(setOtp, setOtpError);

    useImperativeHandle(ref, () => ({
      resetInterval: () => {
        handleRestart();
      },
      triggerToast: (toastMsg: string, hideSubtitle: boolean) => {
        renderToast(toastMsg, hideSubtitle);
      },
    }));

    const renderToast = (toastMsg: string, hideSubtitle?: boolean) => {
      showToast({
        title: toastMsg || localizationText.ERROR.API_ERROR_RESPONSE,
        subTitle: !hideSubtitle ? apiError || localizationText.CARDS.VERIFY_CODE_ACCURACY : '',
        borderColor: colors.error.error25,
        isShowRightIcon: false,
        leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
        isBottomSheet: isBottomSheet,
      });
    };

    return (
      <IPayView testID={`${testID}-otp-verification`} style={styles.container}>
        {isLoading && <IPaySpinner hasBackgroundColor={false} />}

        <IPayView style={styles.messageIconView}>
          <Message />
        </IPayView>
        <IPayView style={styles.headingView}>
          <IPayPageDescriptionText
            heading={localizationText.COMMON.ENTER_RECEIVED_CODE}
            text={`${localizationText.COMMON.ENTER_FOUR_DIGIT_OTP} ${hideContactNumber(mobileNumber)}`}
          />
        </IPayView>

        <IPayOtpInputText isError={otpError} onChangeText={onChangeText} />

        <IPayCaption1Text regular style={styles.timerText} color={colors.natural.natural500}>
          {`${localizationText.COMMON.CODE_EXPIRES_IN} ${formatTime(counter)}`}
        </IPayCaption1Text>

        <IPayButton
          disabled={counter > 0}
          btnType="link-button"
          btnText={localizationText.COMMON.SEND_CODE_AGAIN}
          small
          btnStyle={styles.sendCodeBtnStyle}
          rightIcon={
            <IPayIcon
              icon={icons.refresh}
              size={14}
              color={counter > 0 ? colors.natural.natural200 : colors.primary.primary500}
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
        {showHelp && (
          <IPayButton
            onPress={handleOnPressHelp}
            btnType="link-button"
            btnText={localizationText.COMMON.NEED_HELP}
            large
            btnStyle={styles.needHelpBtn}
            rightIcon={<IPayIcon icon={icons.messageQuestion} size={20} color={colors.primary.primary500} />}
          />
        )}
      </IPayView>
    );
  },
);

export default IPayOtpVerification;
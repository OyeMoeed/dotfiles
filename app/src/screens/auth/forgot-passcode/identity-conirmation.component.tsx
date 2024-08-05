import { IPayIcon, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import prepareForgetPasscode from '@app/network/services/core/prepare-forget-passcode/prepare-forget-passcode.service';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { regex } from '@app/styles/typography.styles';
import icons from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { SetPasscodeComponentProps } from './forget-passcode.interface';
import ForgotPasscodeStyles from './forgot.passcode.styles';

const IdentityConfirmationComponent: React.FC<SetPasscodeComponentProps> = ({ onCallback, onPressHelp }) => {
  const dispatch = useTypedDispatch();
  const { colors } = useTheme();
  const [iqamaId, setIqamaId] = useState<string>('');
  const [iqamaIdErrorMsg, setIqamaIdErrorMsg] = useState<string>('');
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const styles = ForgotPasscodeStyles(colors);
  const localizationText = useLocalization();
  const navigation = useNavigation();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { showToast } = useToastContext();

  const onPressConfirm = () => {
    if (iqamaId != '' && iqamaId.length === constants.IQAMA_ID_NUMBER_LENGTH) {
      prepareForgetPass();
    } else {
      setIqamaIdErrorMsg(localizationText.COMMON.INCORRECT_IQAMA);
      renderToast(localizationText.COMMON.INCORRECT_IQAMA);
    }
  };
  const onPasscodeChangeText = (text: string) => {
    const reg = regex.NUMBERS_ONLY; // Matches an empty string or any number of digits
    if (reg.test(text)) {
      setIqamaId(text);
    }
    setIqamaIdErrorMsg(''); // Reset error message on text change
  };

  const handleOnPressHelp = () => {
    onPressHelp && onPressHelp();
  };

  const prepareForgetPass = async () => {
    setIsLoading(true);
    try {
      const payload = {
        poiNumber: iqamaId,
        authentication: appData.transactionId,
        deviceInfo: appData.deviceInfo,
      };

      const apiResponse = await prepareForgetPasscode(payload, dispatch);
      if (apiResponse?.ok) {
        onCallback &&
          onCallback({
            nextComponent: constants.FORGET_PASSWORD_COMPONENTS.CONFIRM_OTP,
            data: { iqamaId: iqamaId },
          });
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg || localizationText.api_request_failed,
      subTitle: apiError || localizationText.CARDS.VERIFY_CODE_ACCURACY,
      borderColor: colors.error.error25,
      isBottomSheet: true,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainerStyle,
    });
  };

  return (
    <IPayView style={styles.identityContainer}>
      {isLoading && <IPaySpinner />}
      <IPayView style={styles.loginIconView}>
        <icons.userTick width={scale(40)} height={verticalScale(40)} />
      </IPayView>

      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText
          style={styles.headingStyle}
          heading={localizationText.FORGOT_PASSCODE.FORGOT_PASSCODE_HEADING}
          text={localizationText.FORGOT_PASSCODE.FORGOT_PASSCODE_SUBTITLE}
        />
      </IPayView>

      <IPayView style={styles.inputFieldsContainer}>
        <IPayView style={styles.inputTextView}>
          <IPayAnimatedTextInput
            label={localizationText.COMMON.ID_IQAMA}
            editable
            isError={!!iqamaIdErrorMsg}
            assistiveText={iqamaIdErrorMsg}
            value={iqamaId}
            onChangeText={onPasscodeChangeText}
            maxLength={constants.IQAMA_ID_NUMBER_LENGTH}
          />
        </IPayView>
      </IPayView>

      <IPayButton
        onPress={onPressConfirm}
        btnType="primary"
        btnText={localizationText.COMMON.NEXT}
        large
        rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
      />

      <IPayButton
        onPress={handleOnPressHelp}
        btnType="link-button"
        btnText={localizationText.COMMON.NEED_HELP}
        large
        btnStyle={styles.needHelpBtn}
        rightIcon={<IPayIcon icon={icons.messageQuestion} size={20} color={colors.primary.primary500} />}
      />
    </IPayView>
  );
};

export default IdentityConfirmationComponent;

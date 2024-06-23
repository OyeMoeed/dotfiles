import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayPageDescriptionText } from '@app/components/molecules';
import IPayToast from '@app/components/molecules/ipay-toast/ipay-toast.component';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { SetPasscodeComponentProps } from './forget-passcode.interface';
import ForgotPasscodeStyles from './forgot.passcode.styles';

const IdentityConfirmationComponent: React.FC<SetPasscodeComponentProps> = ({ onCallback, onPressHelp }) => {
  const { colors } = useTheme();
  const [iqamaId, setIqamaId] = useState<string>('');
  const [iqamaIdErrorMsg, setIqamaIdErrorMsg] = useState<string>('');
  const correctPasscode = '1234'; // Replace with your correct passcode
  const styles = ForgotPasscodeStyles(colors);
  const localizationText = useLocalization();
  const [showToast, setShowToast] = useState(false);

  const onPressConfirm = () => {
    if (iqamaId === correctPasscode) {
      if (onCallback) {
        onCallback({
          nextComponent: constants.FORGET_PASSWORD_COMPONENTS.CONFIRM_OTP,
          data: { iqamaId },
        });
      }
    } else {
      setIqamaIdErrorMsg(localizationText.incorrect_number);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  const onPasscodeChangeText = (text: string) => {
    setIqamaId(text);
    setIqamaIdErrorMsg(''); // Reset error message on text change
  };

  const handleOnPressHelp = () => {
    if (onPressHelp) onPressHelp();
  };

  const renderToast = () =>
    showToast && (
      <IPayToast
        testID="hideBalanceToast"
        title={localizationText.incorrect_id_iqama_number}
        subTitle={localizationText.please_verify_number_accuracy}
        isShowSubTitle
        isShowButton
        borderColor={colors.error.error25}
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.warning} size={24} color={colors.error.error500} />}
        viewText=""
        onPress={() => setShowToast(false)}
        containerStyle={styles.toast}
      />
    );

  return (
    <IPayView style={styles.identityContainer}>
      <IPayView style={styles.loginIconView}>
        <icons.userTick width={scale(40)} height={verticalScale(40)} />
      </IPayView>

      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText
          style={styles.headingStyle}
          heading={localizationText.forgot_passcode_heading}
          text={localizationText.forgot_passcode_subtitle}
        />
      </IPayView>

      <IPayView style={styles.inputFieldsContainer}>
        <IPayView style={styles.inputTextView}>
          <IPayAnimatedTextInput
            label={localizationText.id_iqama}
            editable
            isError={!!iqamaIdErrorMsg}
            assistiveText={iqamaIdErrorMsg}
            value={iqamaId}
            onChangeText={onPasscodeChangeText}
          />
        </IPayView>
      </IPayView>

      <IPayButton
        onPress={onPressConfirm}
        btnType="primary"
        btnText={localizationText.next}
        large
        rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
      />

      <IPayButton
        onPress={handleOnPressHelp}
        btnType="link-button"
        btnText={localizationText.need_help}
        large
        btnStyle={styles.needHelpBtn}
        rightIcon={<IPayIcon icon={icons.messageQuestion} size={20} color={colors.primary.primary500} />}
      />
      {renderToast()}
    </IPayView>
  );
};

export default IdentityConfirmationComponent;

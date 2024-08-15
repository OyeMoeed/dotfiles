import { IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import genratedStyles from '../registration-successful/registration-successful.style';

const PasscodeRecreatedSuccessfuly: React.FC = () => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const localizationText = useLocalization();

  const handleDonePress = () => {
    goBack();
  };
  return (
    <IPayPageWrapper>
      <IPayView style={styles.parentContainer}>
        <IPayView style={styles.childContainer}>
          <IPaySuccess
            style={styles.successContainer}
            iconsStyles={styles.successIcon}
            descriptionStyle={styles.descriptionStyle}
            headingText={localizationText.CHANGE_PIN.PASSCODE_SET_SUCCESSFULLY}
            descriptionText={localizationText.FORGOT_PASSCODE.NOW_LOGIN_VIA_PASSCODE}
          />
          <IPayView style={styles.buttonContainer}>
            <IPayButton
              btnType="primary"
              btnText={localizationText.COMMON.DONE}
              large
              btnIconsDisabled
              onPress={handleDonePress}
            />
          </IPayView>
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};
export default PasscodeRecreatedSuccessfuly;

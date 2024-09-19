import { IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { buttonVariants } from '@app/utilities';
import genratedStyles from '../registration-successful/registration-successful.style';

const PasscodeRecreatedSuccessfuly: React.FC = () => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);

  const handleDonePress = () => {
    goBack();
  };
  return (
    <IPayPageWrapper>
      <IPayView style={styles.parentContainer}>
        <IPayView style={styles.childContainer}>
          <IPaySuccess
            style={styles.successContainer2}
            iconsStyles={styles.successIcon}
            descriptionStyle={styles.descriptionStyle}
            headingText="CHANGE_PIN.PASSCODE_SET"
            descriptionText="FORGOT_PASSCODE.NOW_LOGIN_VIA_PASSCODE"
          />
          <IPayView style={styles.buttonContainer}>
            <IPayButton
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.DONE"
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

import { IPayView } from '@app/components/atoms';

import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities';
import generatedStyles from './identity-success-message.style';

const IdentitySuccessMessage = () => {
  const { colors } = useTheme();
  const styles = generatedStyles(colors);

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
            headingText="PROFILE.IDENTITY_CONFIRMATION"
            descriptionText="PROFILE.UTILIZE_APP_FEATURE"
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

export default IdentitySuccessMessage;

import { IPayView } from '@app/components/atoms';

import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { generatedStyles } from './identity-success-message.style';

const IdentitySuccessMessage = () => {
  const { colors } = useTheme();
  const styles = generatedStyles(colors);
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
            headingText={localizationText.PROFILE.IDENTITY_CONFIRMATION}
            descriptionText={localizationText.PROFILE.UTILIZE_APP_FEATURE}
          />
          <IPayView style={styles.buttonContainer}>
            <IPayButton btnType="primary" btnText={'COMMON.DONE'} large btnIconsDisabled onPress={handleDonePress} />
          </IPayView>
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default IdentitySuccessMessage;

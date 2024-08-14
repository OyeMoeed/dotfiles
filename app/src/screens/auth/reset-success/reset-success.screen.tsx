import { IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import genratedStyles from './reset-success.style';

const ResetSuccessful: React.FC = () => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const localizationText = useLocalization();

  const handleDonePress = () => {
    navigate(screenNames.MORE);
  };

  return (
    <IPayPageWrapper>
      <IPayView style={styles.parentContainer}>
        <IPayView style={styles.childContainer}>
          <IPaySuccess
            style={styles.successContainer}
            iconsStyles={styles.successIcon}
            descriptionStyle={styles.descriptionStyle}
            headingText={localizationText.SETTINGS.PASSCODE_CHANGED_SUCCESSFULY}
            descriptionText={localizationText.SETTINGS.SAVE_FOR_LATER}
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
export default ResetSuccessful;

import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText, IPayHeader, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper, IPaySafeAreaView } from '@app/components/templates';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { genratedStyles } from '../registration-successful/registration-successful.style';

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

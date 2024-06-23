import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { genratedStyles } from '../registration-successful/registration-successful.style';
import screenNames from '@app/navigation/screen-names.navigation';

const ResetSuccessful: React.FC = () => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const localizationText = useLocalization();

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const handleDonePress = () => {
    navigate(screenNames.MORE);
  };
  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientSecondary40}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} />
      <IPayView style={styles.container}>
        <IPayView style={styles.linearGradientView}>
          <IPayLinearGradientView
            style={[styles.innerLinearGradientView]}
            gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
          >
            <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
            <IPayView style={styles.linearGradientTextView}>
              <IPayGradientText
                text={localizationText.passcode_set_successfuly}
                gradientColors={gradientColors}
                fontSize={styles.linearGradientText.fontSize}
                fontFamily={styles.linearGradientText.fontFamily}
                style={styles.gradientTextSvg}
                yScale={15}
              />
            </IPayView>
            <IPayFootnoteText
              regular
              color={colors.primary.primary800}
              text={localizationText.now_login_via_passcode}
              style={styles.passcodeSuccessText}
            />
            <IPayButton
              btnType="primary"
              btnText={localizationText.done}
              large
              btnStyle={styles.btnStyle}
              btnIconsDisabled
              onPress={handleDonePress}
            />
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};
export default ResetSuccessful;

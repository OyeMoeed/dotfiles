import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import { IPayFootnoteText, IPayImage, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import IPayLottieAnimation from '@app/components/atoms/ipay-lottie-animation/ipay-lottie-animation.component';
import { IPayButton, IPayGradientText, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { generatedStyles } from './identity-success-message.style';

const IdentitySuccessMessage = () => {
  const { colors } = useTheme();
  const styles = generatedStyles(colors);
  const localizationText = useLocalization();

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const handleDonePress = () => {
    goBack();
  };

  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientSecondary40}>
      <IPayHeader centerIcon={<IPayImage image={images.logoSmall} style={styles.logoStyles} />} />
      <IPayView style={styles.container}>
        <IPayView style={styles.linearGradientView}>
          <IPayLinearGradientView
            style={[styles.innerLinearGradientView]}
            gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
          >
            <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
            <IPayView style={styles.linearGradientTextView}>
              <IPayGradientText
                text={localizationText.identity_confirmation}
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
              text={localizationText.utilize_app_feature}
              style={styles.identitySuccessText}
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

export default IdentitySuccessMessage;

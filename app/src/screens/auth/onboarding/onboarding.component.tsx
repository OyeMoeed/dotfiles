import images from '@app/assets/images';
import { IPayImage, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import {
  IPayAnimatedButton,
  IPayAnimatedHeader,
  IPayAnimatedImage,
  IPayAnimatedText,
  IPayLanguageSelectorButton,
  IPayStepIndicator,
} from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import OnboardingSteps from './onboarding-enum.util';
import { OnboardingScreenProps } from './onboarding.interface';
import onboardingStyles from './onboardingStyles.style';

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  steps = 3,
  currentStep = 1,
  image,
  title = '',
  description = '',
  gradientColors,
  onSkip,
  onNext,
  skipText,
  nextText,
  type = OnboardingSteps.OpportunitiesStep,
  bottomButtonViewStyle,
  runAnimation = false,
}) => {
  const { colors } = useTheme();
  const styles = onboardingStyles(colors);

  return (
    <IPayLinearGradientView
      style={styles.container}
      locations={[0, 0.8, 1]}
      gradientColors={gradientColors}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <IPayView style={styles.headerStyles}>
        <IPayView style={styles.headerContainer}>
          <IPayAnimatedHeader type={type} runAnimation={runAnimation}>
            <IPayImage resizeMode="contain" style={styles.imageLogo} image={images.logoAlinma} />
          </IPayAnimatedHeader>
          <IPayLanguageSelectorButton />
        </IPayView>
      </IPayView>
      <IPayView style={styles.imageStyles}>
        <IPayAnimatedImage type={type} image={image} styles={styles.innerImageStyles} runAnimation={runAnimation} />
      </IPayView>
      <IPayView style={[styles.bottomButtonView, bottomButtonViewStyle]}>
        <IPayView style={styles.textContainer}>
          <IPayStepIndicator steps={steps} currentStep={currentStep} />
          <IPayAnimatedText
            type={type}
            title={title}
            description={description}
            styles={styles}
            runAnimation={runAnimation}
          />
        </IPayView>
        <IPayAnimatedButton
          type={type}
          onNext={onNext}
          onSkip={onSkip}
          skipText={skipText}
          nextText={nextText}
          styles={styles}
          runAnimation={runAnimation}
        />
      </IPayView>
    </IPayLinearGradientView>
  );
};

export default OnboardingScreen;

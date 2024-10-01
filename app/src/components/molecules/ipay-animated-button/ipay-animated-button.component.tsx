import icon from '@app/assets/icons';
import { IPayAnimatedView, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { animateValue } from '@app/ipay-animations/ipay-animations';
import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';
import onboardingStyles from '@app/screens/auth/onboarding/onboardingStyles.style';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { buttonVariants } from '@app/utilities';
import { IPayAnimatedButtonProps } from './ipay-animated-button.interface';

const IPayAnimatedButton: React.FC<IPayAnimatedButtonProps> = ({
  type,
  onNext = () => {},
  onSkip = () => {},
  skipText = '',
  nextText = '',
  testID,
  runAnimation,
}) => {
  const buttonTranslation = useSharedValue(100);
  const buttonWidth = useSharedValue(50); //   half width to use with reanimated
  const { colors } = useTheme();
  const styles = onboardingStyles(colors);

  React.useEffect(() => {
    if (runAnimation) {
      if (type === OnboardingSteps.OpportunitiesStep) {
        animateValue(buttonTranslation, 0);
      } else if (type === OnboardingSteps.PurchasesStep) {
        animateValue(buttonWidth, 100);
      }
    }

    return () => {
      buttonTranslation.value = 100;
      buttonWidth.value = 50;
    };
  }, [buttonTranslation, buttonWidth, runAnimation, type]);

  const animatedBtnStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonTranslation.value }],
  }));

  const animatedButtonWidth = useAnimatedStyle(() => ({
    width: `${buttonWidth.value}%`,
  }));

  return (
    <IPayAnimatedView
      testID={`${testID}-button-animation`}
      style={[type === OnboardingSteps.OpportunitiesStep && animatedBtnStyle, styles.bottomButtonView]}
    >
      <IPayView style={styles.buttonFlexBox}>
        {type !== OnboardingSteps.PurchasesStep && (
          <IPayButton
            onPress={onSkip}
            btnType={buttonVariants.LINK_BUTTON}
            btnIconsDisabled
            btnText={skipText}
            textStyle={styles.blackText}
          />
        )}
        <IPayAnimatedView style={type === OnboardingSteps.PurchasesStep && animatedButtonWidth}>
          <IPayButton
            onPress={onNext}
            btnType={buttonVariants.PRIMARY}
            btnText={nextText}
            textColor={colors.natural.natural1000}
            textStyle={styles.blackText}
            btnStyle={[styles.nextButton, type === OnboardingSteps.PurchasesStep && styles.variant3]}
            rightIcon={<IPayIcon icon={icon.rightArrow} color={colors.natural.natural1000} />}
            btnIconsDisabled={type === OnboardingSteps.PurchasesStep}
          />
        </IPayAnimatedView>
      </IPayView>
    </IPayAnimatedView>
  );
};

export default IPayAnimatedButton;

import React from 'react';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { IPayAnimatedView, IPayImage } from '@app/components/atoms';
import { animateValue } from '@app/ipay-animations/ipay-animations';
import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';
import { IPayAnimatedImageProps } from './ipay-animated-image.interface';

const IPayAnimatedImage: React.FC<IPayAnimatedImageProps> = ({ type, image, styles, testID, runAnimation }) => {
  const scale = useSharedValue(0.5);
  const scaleOnboarding2 = useSharedValue(1.5);

  React.useEffect(() => {
    if (runAnimation) {
      switch (type) {
        case OnboardingSteps.OpportunitiesStep:
        case OnboardingSteps.PurchasesStep:
          animateValue(scale, 1);
          break;
        case OnboardingSteps.SendAndReceiveStep:
          animateValue(scaleOnboarding2, 1);
          break;
        default:
          break;
      }
    }

    return () => {
      scale.value = 0.5;
      scaleOnboarding2.value = 1.5;
    };
  }, [type, runAnimation, scale, scaleOnboarding2]);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedImageStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scaleOnboarding2.value }],
  }));

  return (
    <IPayAnimatedView
      testID={`${testID}-image-animation`}
      style={type === OnboardingSteps.SendAndReceiveStep ? animatedImageStyle2 : animatedImageStyle}
    >
      <IPayImage resizeMode="contain" image={image} style={styles} />
    </IPayAnimatedView>
  );
};

export default IPayAnimatedImage;

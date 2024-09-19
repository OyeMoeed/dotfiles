import { IPayAnimatedView } from '@app/components/atoms';
import { animateValue } from '@app/ipay-animations/ipay-animations';
import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';
import React from 'react';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { IPayAnimatedHeaderProps } from './ipay-animated-header.interface';

const IPayAnimatedHeader: React.FC<IPayAnimatedHeaderProps> = ({ type, children, testID }) => {
  const headerTranslationX = useSharedValue(100);
  const headerTranslationY = useSharedValue(100);

  React.useEffect(() => {
    if (type === OnboardingSteps.OpportunitiesStep) {
      animateValue(headerTranslationY, 0);
      animateValue(headerTranslationX, 0);
    }
  }, [type]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslationY.value }, { translateX: headerTranslationX.value }],
  }));

  return (
    <IPayAnimatedView
      testID={`${testID}-header-animation`}
      style={type === OnboardingSteps.OpportunitiesStep ? headerAnimatedStyle : {}}
    >
      {children}
    </IPayAnimatedView>
  );
};

export default IPayAnimatedHeader;

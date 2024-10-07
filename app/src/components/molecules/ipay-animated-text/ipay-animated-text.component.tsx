import { IPayAnimatedView, IPaySubHeadlineText, IPayTitle1Text } from '@app/components/atoms';
import constants from '@app/constants/constants';
import { animateValue, fadeIn, fadeOut } from '@app/ipay-animations/ipay-animations';
import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { IPayAnimatedTextProps } from './ipay-animated-text.interface';

const IPayAnimatedText: React.FC<IPayAnimatedTextProps> = ({
  type,
  styles,
  title,
  description,
  testID,
  runAnimation,
}) => {
  const translation = useSharedValue(-100);
  const duration = constants.ANIMATION_DURATIONS;

  useEffect(() => {
    if (type === OnboardingSteps.OpportunitiesStep && runAnimation) {
      animateValue(translation, 0);
    }

    return () => {
      translation.value = -100;
    };
  }, [runAnimation, translation, type]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translation.value }],
  }));

  const fadeAnim1 = useRef(new Animated.Value(0.2)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current; // For the title animation with delay

  useEffect(() => {
    if (type !== OnboardingSteps.OpportunitiesStep && runAnimation) {
      Animated.sequence([fadeIn(fadeAnim1, duration.duration300), fadeOut(fadeAnim1, duration.duration300)]).start();
    }

    // Animate the third text with delay
    fadeIn(fadeAnim3, duration.duration200).start();

    return () => {
      fadeAnim1.setValue(0.2);
      fadeAnim3.setValue(0);
    };
  }, [duration.duration200, duration.duration300, fadeAnim1, fadeAnim3, runAnimation, type]);

  return (
    <IPayAnimatedView
      testID={`${testID}-title-animation`}
      style={type === OnboardingSteps.OpportunitiesStep ? animatedStyle : null}
    >
      {type !== OnboardingSteps.OpportunitiesStep && (
        <Animated.View style={[styles.absoulteStyle, { opacity: fadeAnim1 }]}>
          <IPayTitle1Text
            style={[styles.title, styles.lowOpacity]}
            text={
              type === OnboardingSteps.SendAndReceiveStep
                ? 'ONBOARDING.TITLE_ONBOARDING_ONE'
                : 'ONBOARDING.TITLE_ONBOARDING_TWO'
            }
          />
        </Animated.View>
      )}

      <Animated.View style={{ opacity: fadeAnim3 }}>
        <IPayTitle1Text style={styles.title} regular text={title} />
      </Animated.View>

      <IPaySubHeadlineText regular style={[styles.subtitle, styles.topMargins]} text={description} />
    </IPayAnimatedView>
  );
};

export default IPayAnimatedText;

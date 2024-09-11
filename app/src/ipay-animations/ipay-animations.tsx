import { Animated, Easing } from 'react-native';
import { SharedValue, withSpring, withTiming } from 'react-native-reanimated';

// Generic animation function for fading in
const fadeIn = (animValue: Animated.Value | Animated.ValueXY, duration = 1000) =>
  Animated.timing(animValue, {
    toValue: 1,
    duration,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });

// Generic animation function for fading out
const fadeOut = (animValue: Animated.Value | Animated.ValueXY, duration = 1000) =>
  Animated.timing(animValue, {
    toValue: 0,
    duration,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });

// Generic animation function for scaling
const scale = (animValue: Animated.Value | Animated.ValueXY, toValue = 1, duration = 1000) =>
  Animated.timing(animValue, {
    toValue,
    duration,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });

// Generic animation function for translating
const translate = (animValue: Animated.Value | Animated.ValueXY, toValue = 0, duration = 1000) =>
  Animated.timing(animValue, {
    toValue,
    duration,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });

// Generic animation function for parallel animations
const parallelAnimations = (animations: Animated.CompositeAnimation[]) => Animated.parallel(animations);

// Generic animation function for sequence animations
const sequenceAnimations = (animations: Animated.CompositeAnimation[]) => Animated.sequence(animations);

// Generic animation function for reanimated with timing
const animateValue = (sharedValue: SharedValue<number>, toValue: number, duration = 500, config = {}) => {
  'worklet';

  // TODO: needs to be checked, and fix return-assign
  // eslint-disable-next-line no-return-assign, no-param-reassign
  return (sharedValue.value = withTiming(toValue, {
    duration,
    ...config,
  }));
};

// Generic animation function for scaling with reanimated
const animateValueSpring = (sharedValue: { value: any }, toValue: any, config = {}) => {
  'worklet';

  // eslint-disable-next-line no-return-assign, no-param-reassign
  return (sharedValue.value = withSpring(toValue, {
    damping: 10,
    stiffness: 90,
    ...config,
  }));
};

export { fadeIn, fadeOut, scale, translate, parallelAnimations, sequenceAnimations, animateValue, animateValueSpring };

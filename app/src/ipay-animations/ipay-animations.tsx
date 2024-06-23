import { Animated, Easing } from 'react-native';
import { SharedValue, withSpring, withTiming } from 'react-native-reanimated';

// Generic animation function for fading in
const fadeIn = (animValue: Animated.Value | Animated.ValueXY, duration = 1000) => {
  return Animated.timing(animValue, {
    toValue: 1,
    duration: duration,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });
};

// Generic animation function for fading out
const fadeOut = (animValue: Animated.Value | Animated.ValueXY, duration = 1000) => {
  return Animated.timing(animValue, {
    toValue: 0,
    duration: duration,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });
};

// Generic animation function for scaling
const scale = (animValue: Animated.Value | Animated.ValueXY, toValue = 1, duration = 1000) => {
  return Animated.timing(animValue, {
    toValue: toValue,
    duration: duration,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });
};

// Generic animation function for translating
const translate = (animValue: Animated.Value | Animated.ValueXY, toValue = 0, duration = 1000) => {
  return Animated.timing(animValue, {
    toValue: toValue,
    duration: duration,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  });
};

// Generic animation function for parallel animations
const parallelAnimations = (animations: Animated.CompositeAnimation[]) => {
  return Animated.parallel(animations);
};

// Generic animation function for sequence animations
const sequenceAnimations = (animations: Animated.CompositeAnimation[]) => {
  return Animated.sequence(animations);
};

// Generic animation function for reanimated with timing
const animateValue = (sharedValue: SharedValue<number>, toValue: number, duration = 500, config = {}) => {
  'worklet';
  return (sharedValue.value = withTiming(toValue, {
    duration: duration,
    ...config,
  }));
};

// Generic animation function for scaling with reanimated
const animateValueSpring = (sharedValue: { value: any; }, toValue: any, config = {}) => {
  'worklet';
  return (sharedValue.value = withSpring(toValue, {
    damping: 10,
    stiffness: 90,
    ...config,
  }));
};

export { fadeIn, fadeOut, scale, translate, parallelAnimations, sequenceAnimations, animateValue, animateValueSpring };

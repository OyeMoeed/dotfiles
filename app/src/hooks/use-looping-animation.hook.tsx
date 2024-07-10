import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useLoopingAnimation = (duration = 1000, outputRange = [0, 1]) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animatedStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange,
        }),
      },
    ],
  };

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => {
      animation.stop();
    };
  }, [animatedValue, duration]);

  return animatedStyle;
};

export default useLoopingAnimation;

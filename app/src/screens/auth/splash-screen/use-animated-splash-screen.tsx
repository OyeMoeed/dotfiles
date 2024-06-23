import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import constants from '@app/constants/constants';
import { fadeIn, scale, parallelAnimations } from '@app/ipay-animations/ipay-animations';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';

const useSplashScreenAnimations = () => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const animationDurations = constants.ANIMATION_DURATIONS;

  useEffect(() => {
    parallelAnimations([
      fadeIn(opacityAnim, animationDurations.duration2000),
      scale(scaleAnim, 1, animationDurations.duration1000),
    ]).start();

    setTimeout(() => {
      fadeIn(blurAnim, animationDurations.duration1000).start(() => {
       navigate(screenNames.ONBOARDING);
      });
    }, animationDurations.duration1000);
  }, [opacityAnim, scaleAnim, blurAnim, navigation]);

  return { opacityAnim, scaleAnim, blurAnim };
};

export default useSplashScreenAnimations;

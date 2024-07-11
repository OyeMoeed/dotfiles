import constants from '@app/constants/constants';
import { fadeIn, parallelAnimations, scale } from '@app/ipay-animations/ipay-animations';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setAppData } from '@app/store/slices/app-data-slice';
import {  useTypedSelector } from '@app/store/store';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const useSplashScreenAnimations = () => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const animationDurations = constants.ANIMATION_DURATIONS;
  const { isFirstTime, isLinkedDevice } = useTypedSelector((state) => state.appDataReducer.appData);

  useEffect(() => {
    parallelAnimations([
      fadeIn(opacityAnim, animationDurations.duration2000),
      scale(scaleAnim, 1, animationDurations.duration1000),
    ]).start();


    setTimeout(() => {
      fadeIn(blurAnim, animationDurations.duration1000).start(() => {
        if (isFirstTime) {
          dispatch(setAppData({ isFirstTime: false }));
          navigate(screenNames.ONBOARDING);
        } else if (isLinkedDevice) {
          navigate(screenNames.LOGIN_VIA_PASSCODE);
        } else {
          navigate(screenNames.MOBILE_IQAMA_VERIFICATION);
        }
      });
    }, animationDurations.duration1000);
  }, [opacityAnim, scaleAnim, blurAnim, navigation]);

  return { opacityAnim, scaleAnim, blurAnim };
};

export default useSplashScreenAnimations;

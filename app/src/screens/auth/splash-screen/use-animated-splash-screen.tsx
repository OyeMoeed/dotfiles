import constants from '@app/constants/constants';
import useLocation from '@app/hooks/location.hook';
import { fadeIn, parallelAnimations, scale } from '@app/ipay-animations/ipay-animations';
import { navigateAndReset } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities';
import { hideForceUpdate, showForceUpdate } from '@app/store/slices/app-force-update-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-native';

const useSplashAnimations = () => {
  const { ready: isTranslationsLoaded } = useTranslation(undefined, {
    useSuspense: false,
  });

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const animationDurations = constants.ANIMATION_DURATIONS;
  const dispatch = useTypedDispatch();
  useLocation();
  const { isFirstTime, isLinkedDevice, isAuthenticated } = useTypedSelector((state) => state.appDataReducer.appData);

  const splashPrepareApi = async () => {
    const deviceInfo = await getDeviceInfo();
    const prepareLoginPayload: DeviceInfoProps = {
      ...deviceInfo,
      locationDetails: {},
    };

    const apiResponse: any = await prepareLogin(prepareLoginPayload);
    if (apiResponse.status?.code === 'E430995') {
      dispatch(showForceUpdate());
    } else {
      dispatch(hideForceUpdate());
    }
  };
  const handleNavigation = async () => {
    if (isFirstTime) {
      navigateAndReset(screenNames.ONBOARDING);
    } else if (!isAuthenticated && isLinkedDevice) {
      navigateAndReset(screenNames.LOGIN_VIA_PASSCODE);
    } else {
      navigateAndReset(screenNames.MOBILE_IQAMA_VERIFICATION);
    }
  };

  useEffect(() => {
    const runAnimations = async () => {
      await parallelAnimations([
        fadeIn(opacityAnim, animationDurations.duration2000),
        scale(scaleAnim, 1, animationDurations.duration1000),
      ]).start();

      if (isTranslationsLoaded) {
        splashPrepareApi();

        await fadeIn(blurAnim, animationDurations.duration500).start(async () => {
          await handleNavigation();
        });
      }
    };

    runAnimations();
  }, [dispatch, isLinkedDevice, opacityAnim, scaleAnim, blurAnim, navigation, isTranslationsLoaded]);

  return { opacityAnim, scaleAnim, blurAnim };
};

export default useSplashAnimations;

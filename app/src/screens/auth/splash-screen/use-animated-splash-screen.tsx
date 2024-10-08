import constants from '@app/constants/constants';
import { fadeIn, parallelAnimations, scale } from '@app/ipay-animations/ipay-animations';
import { navigateAndReset } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setAuth } from '@app/store/slices/auth-slice';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import { DeviceInfoProps, ErrorStatus } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities';
import { showForceUpdate } from '@app/store/slices/app-force-update-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-native';
import { updateBaseURL } from '@app/network/utilities/base-url';
import { APIResponseType, getValueFromAsyncStorage, setValueToAsyncStorage } from '@app/utilities';
import { setToken } from '@app/network/client';

const useSplashAnimations = () => {
  const { ready: isTranslationsLoaded } = useTranslation(undefined, {
    useSuspense: false,
  });

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  const animationDurations = constants.ANIMATION_DURATIONS;
  const dispatch = useTypedDispatch();
  const { isFirstTime, isLinkedDevice, isAuthenticated } = useTypedSelector((state) => state.appDataReducer.appData);

  const splashPrepareApi = useCallback(async () => {
    const skipLoginAfterChange = await getValueFromAsyncStorage('skipLoginAfterLogin');
    const deviceInfo = await getDeviceInfo();
    const prepareLoginPayload: DeviceInfoProps = {
      ...deviceInfo,
      locationDetails: {},
    };

    const apiResponse: any = await prepareLogin(prepareLoginPayload, true);
    if (apiResponse?.status.type === APIResponseType.SUCCESS && skipLoginAfterChange === 'false') {
      setToken(apiResponse?.headers?.authorization);
    }
    if (apiResponse?.status?.code === ErrorStatus.FORCE_UPDATE) {
      dispatch(showForceUpdate());
    }
  }, [dispatch]);

  const handleNavigation = useCallback(async () => {
    const skipLoginAfterChange = await getValueFromAsyncStorage('skipLoginAfterLogin');

    if (skipLoginAfterChange === 'true') {
      await setValueToAsyncStorage('skipLoginAfterLogin', 'false');

      setTimeout(() => {
        dispatch(setAuth(true));
      }, 150);
      return;
    }

    if (isFirstTime) {
      navigateAndReset(screenNames.ONBOARDING);
    } else if (!isAuthenticated && isLinkedDevice) {
      navigateAndReset(screenNames.LOGIN_VIA_PASSCODE);
    } else {
      navigateAndReset(screenNames.MOBILE_IQAMA_VERIFICATION);
    }
  }, [dispatch, isAuthenticated, isFirstTime, isLinkedDevice]);

  const checkForPreviousSelectedEnv = () => {
    updateBaseURL();
  };

  const runAnimations = useCallback(async () => {
    const { duration2000, duration1000, duration500 } = animationDurations;
    parallelAnimations([fadeIn(opacityAnim, duration2000), scale(scaleAnim, 1, duration1000)]).start();

    if (isTranslationsLoaded) {
      splashPrepareApi();

      fadeIn(blurAnim, duration500).start(async () => {
        await handleNavigation();
      });
    }
  }, [animationDurations, blurAnim, handleNavigation, isTranslationsLoaded, opacityAnim, scaleAnim, splashPrepareApi]);

  useEffect(() => {
    checkForPreviousSelectedEnv();
    runAnimations();
  }, [runAnimations]);

  return { opacityAnim, scaleAnim, blurAnim };
};

export default useSplashAnimations;

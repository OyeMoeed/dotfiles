import constants from '@app/constants/constants';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import PermissionTypes from '@app/enums/permissions-types.enum';
import useLocation from '@app/hooks/location.hook';
import { fadeIn, parallelAnimations, scale } from '@app/ipay-animations/ipay-animations';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setAppData } from '@app/store/slices/app-data-slice';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
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
  const dispatch = useTypedDispatch();

  const { permissionStatus, retryPermission } = useLocation(PermissionTypes.LOCATION, true);

  const handlePermissionAndNavigate = async () => {
    if (permissionStatus !== permissionsStatus.GRANTED) {
      await retryPermission();
    }

    if (permissionStatus === permissionsStatus.GRANTED) {
      if (isFirstTime) {
        dispatch(setAppData({ isFirstTime: false }));
        navigate(screenNames.ONBOARDING);
      } else if (isLinkedDevice) {
        navigate(screenNames.LOGIN_VIA_PASSCODE);
      } else {
        navigate(screenNames.MOBILE_IQAMA_VERIFICATION);
      }
    }
  };

  useEffect(() => {
    const runAnimations = async () => {
      await parallelAnimations([
        fadeIn(opacityAnim, animationDurations.duration2000),
        scale(scaleAnim, 1, animationDurations.duration1000),
      ]).start();

      prepareLogin(dispatch);

      setTimeout(async () => {
        await fadeIn(blurAnim, animationDurations.duration1000).start(async () => {
          await handlePermissionAndNavigate();
        });
      }, animationDurations.duration1000);
    };

    runAnimations();
  }, [dispatch, isFirstTime, isLinkedDevice, opacityAnim, scaleAnim, blurAnim, navigation, permissionStatus]);

  return { opacityAnim, scaleAnim, blurAnim };
};

export default useSplashScreenAnimations;

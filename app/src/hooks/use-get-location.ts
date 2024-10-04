import { useAppState } from '@app/hooks/use-appstate.hook';
import { useCallback, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geolocation, { PositionError, GeoCoordinates, GeoError } from 'react-native-geolocation-service';
import { isAndroidOS } from '@app/utilities/constants';
import { isLocationEnabledSync } from 'react-native-device-info';
import { useTypedDispatch } from '@app/store/store';
import { hidePermissionModal, showPermissionModal } from '@app/store/slices/permission-alert-slice';

const LOCATION_COORDS_OPTIONS: Geolocation.GeoOptions = {
  enableHighAccuracy: true,
  timeout: 15 * 1000,
  maximumAge: 10 * 1000,
  ...Platform.select({
    android: {
      showLocationDialog: true,
      forceRequestLocation: true,
      accuracy: { android: 'balanced' },
    },
    ios: {},
  }),
};

const openGlobalLocationSettings = async () => {
  try {
    if (isAndroidOS) {
      await Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
    } else {
      await Linking.openURL('App-Prefs:Privacy&path=LOCATION');
    }
  } catch {
    /* empty */
  }
};

const openLocationSettings = (error: GeoError) => {
  // if it timed-out, opening the location settings will not help
  if (error?.code === PositionError.TIMEOUT) {
    return;
  }

  const failedToGetLocation = error?.code && error?.code !== PositionError.PERMISSION_DENIED;

  if (!isLocationEnabledSync() || failedToGetLocation) {
    openGlobalLocationSettings();
    return;
  }

  openSettings();
};

const useGetLocation = ({
  onLocationSelected,
}: {
  onLocationSelected: (position: GeoCoordinates) => void | Promise<void>;
}) => {
  const dispatch = useTypedDispatch();

  const handleClosePress = useCallback(() => {
    dispatch(hidePermissionModal());
  }, [dispatch]);

  const handlePresentSheet = useCallback(() => {
    dispatch(showPermissionModal());
  }, [dispatch]);

  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      async (position) => {
        await onLocationSelected(position.coords);
        handleClosePress();
      },
      openLocationSettings,
      LOCATION_COORDS_OPTIONS,
    );
  }, [handleClosePress, onLocationSelected]);

  const requestLocationPermission = useCallback(async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });
      if (permission) {
        const result = await request(permission);
        if (result === RESULTS.GRANTED) {
          getLocation();
        } else {
          openSettings();
        }
      }
    } catch (error) {
      /* empty */
    }
  }, [getLocation]);

  const checkLocationPermission = useCallback(async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });
      if (permission) {
        const response = await check(permission);
        if (response === RESULTS.GRANTED) {
          getLocation();
        } else {
          handlePresentSheet();
        }
      }
    } catch (error) {
      /* empty */
    }
  }, [getLocation, handlePresentSheet]);

  useAppState(checkLocationPermission);

  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);

  return {
    requestLocationPermission,
    handleClosePress,
    handlePresentSheet,
  };
};

export default useGetLocation;

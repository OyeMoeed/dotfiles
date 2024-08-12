import { osTypes } from '@app/enums/os-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import getGeocode from '@app/network/services/core/geocode/geocode.service';
import { showPermissionAlert } from '@app/store/slices/permission-alert-slice';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useDispatch } from 'react-redux';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useLocation = () => {
  const [permissionStatus, setPermissionStatus] = useState(permissionsStatus.UNKNOWN);

  const [location, setLocation] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const locaizationText = useLocalization();
  const dispatch = useDispatch();
  const checkPermission = async () => {
    try {
      let permission;
      permission = await requestLocationPermission();

      // Handle the permission status
      handlePermissionStatus(permission);
    } catch (error) {
      console.error('Error checking permission:', error);
      setPermissionStatus(permissionsStatus.UNAVAILABLE);
    }
  };

  const handlePermissionStatus = (status: string) => {
    switch (status) {
      case permissionsStatus.GRANTED:
        setPermissionStatus(permissionsStatus.GRANTED);
        break;

      case permissionsStatus.DENIED:
        setPermissionStatus(permissionsStatus.DENIED);
        break;

      case permissionsStatus.BLOCKED:
        setPermissionStatus(permissionsStatus.BLOCKED);
        dispatch(showPermissionAlert());

        break;

      case permissionsStatus.LIMITED:
        setPermissionStatus(permissionsStatus.LIMITED);
        break;

      case permissionsStatus.UNAVAILABLE:
      default:
        setPermissionStatus(permissionsStatus.UNAVAILABLE);
        break;
    }
  };
  const requestLocationPermission = async () => {
    if (Platform.OS === osTypes.ANDROID) {
      return await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
      return await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }
  };

  const getAddressFromCoordinates = useCallback(async (coords: Coordinates) => {
    try {
      const data = await getGeocode(coords.latitude, coords.longitude);
      if (data.results.length > 0) {
        setAddress(data.results[0]?.formatted_address);
      } else {
        setAddress(locaizationText.LOCATION.ADDRESS_NOT_FOUND);
      }
    } catch (error) {
      setError(error.error || 'Unknown error');
    }
  }, []);

  const getLocation = useCallback(() => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position;
          setLocation(coords);
          getAddressFromCoordinates(coords);
        },
        (error) => {
          setError(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } catch (error) {
      if (error.message.includes('RNFusedLocation.getCurrentLocation')) {
        setError(locaizationText.LOCATION.LOCATION_MODULE_NOT_FOUND);
      } else {
        setError(locaizationText.LOCATION.ERROR_WHILE_TRYING_TO_GET_LOCATION);
      }
    }
  }, [getAddressFromCoordinates]);

  useEffect(() => {
    if (permissionStatus === permissionsStatus.GRANTED) {
      getLocation();
    }
  }, [permissionStatus, getLocation]);

  return { permissionStatus, location, address, error, retryPermission: checkPermission };
};

export default useLocation;

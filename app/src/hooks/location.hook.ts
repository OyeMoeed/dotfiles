import { permissionsStatus } from '@app/enums/permissions-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import getGeocode from '@app/network/services/core/geocode/geocode.service';
import { useCallback, useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import usePermissions from './permissions.hook';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useLocation = (permissionType: string, isLocationMandatory = false) => {
  const { permissionStatus, retryPermission, handleGotoSetting, checkPermissionStatus } = usePermissions(
    permissionType,
    isLocationMandatory,
  );
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const locaizationText = useLocalization();

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

  return { permissionStatus, location, address, error, retryPermission, handleGotoSetting, checkPermissionStatus };
};

export default useLocation;

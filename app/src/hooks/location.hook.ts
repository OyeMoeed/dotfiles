import { permissionsStatus } from '@app/enums/permissions-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import getGeocode from '@app/network/services/core/geocode/geocode.service';
import { useCallback, useEffect, useState } from 'react';
import Geolocation, { GeolocationError, GeolocationResponse } from 'react-native-geolocation-service';
import usePermissions from './permissions.hook';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useLocation = (permissionType: string, isLocationMandatory = false) => {
  const { permissionStatus, retryPermission } = usePermissions(permissionType, isLocationMandatory);
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
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        const { coords } = position;
        setLocation(coords);
        getAddressFromCoordinates(coords);
      },
      (error: GeolocationError) => {
        setError(error?.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  useEffect(() => {
    if (permissionStatus === permissionsStatus.GRANTED) {
      getLocation();
    } else if (permissionStatus !== permissionsStatus.UNKNOWN) {
      retryPermission();
    }
  }, [permissionStatus, retryPermission, getLocation]);

  return { permissionStatus, location, address, error, retryPermission };
};

export default useLocation;

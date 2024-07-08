import { permissionsStatus } from '@app/enums/permissions-status.enum';
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

  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        const coords = position.coords;
        setLocation(coords);
        getAddressFromCoordinates(coords);
      },
      (error: GeolocationError) => {
        setError(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  const getAddressFromCoordinates = useCallback(async (coords: Coordinates) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=GOOGLE_MAPS_API_KEY`,
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      setError(error.message);
    }
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

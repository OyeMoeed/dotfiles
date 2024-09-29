import { OsTypes, PermissionsStatus } from '@app/enums';
import { IlocationDetails } from '@app/network/services/services.interface';
import { showPermissionAlert } from '@app/store/slices/permission-alert-slice';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useDispatch } from 'react-redux';

const useLocation = () => {
  const { ready: isTranslationsLoaded } = useTranslation(undefined, {
    useSuspense: false,
  });
  const { t } = useTranslation();
  const [permissionStatus, setPermissionStatus] = useState(PermissionsStatus.UNKNOWN);
  const [location, setLocation] = useState<IlocationDetails | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const dispatch = useDispatch();

  const requestLocationPermission = useCallback(async (): Promise<string> => {
    if (Platform.OS === OsTypes.ANDROID) {
      return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  }, []);

  const handlePermissionStatus = (status: string, showAlert: boolean = true): boolean => {
    switch (status) {
      case PermissionsStatus.GRANTED:
        setPermissionStatus(PermissionsStatus.GRANTED);
        return true;

      case PermissionsStatus.DENIED:
        setPermissionStatus(PermissionsStatus.DENIED);
        return false;

      case PermissionsStatus.BLOCKED: {
        const title = t('LOCATION.PERMISSION_REQUIRED');
        const description = t('LOCATION.LOCATION_PERMISSION_REQUIRED');

        setPermissionStatus(PermissionsStatus.BLOCKED);
        if (showAlert) dispatch(showPermissionAlert({ title, description }));
        return false;
      }

      case PermissionsStatus.LIMITED:
        setPermissionStatus(PermissionsStatus.LIMITED);
        return false;

      case PermissionsStatus.UNAVAILABLE:
      default:
        setPermissionStatus(PermissionsStatus.UNAVAILABLE);
        return false;
    }
  };

  const checkPermission = async (showAlert: boolean = true): Promise<boolean> => {
    try {
      const permission = await requestLocationPermission();
      return handlePermissionStatus(permission, showAlert);
    } catch (error) {
      setPermissionStatus(PermissionsStatus.UNAVAILABLE);
      return false;
    }
  };

  useEffect(() => {
    if (isTranslationsLoaded) {
      checkPermission();
    }
  }, []);

  const fetchLocation = useCallback(
    async (showAlert: boolean = true): Promise<IlocationDetails | null> => {
      const hasPermission = await checkPermission(showAlert);

      if (hasPermission) {
        setIsFetchingLocation(true);
        try {
          const position = await new Promise<Geolocation.GeoPosition>((resolve, reject) => {
            Geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            });
          });

          const { latitude, longitude } = position.coords;
          const locationDetails: IlocationDetails = {
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          };
          setLocation(locationDetails);
          return locationDetails;
        } catch (error) {
          setPermissionStatus(PermissionsStatus.UNAVAILABLE);
          return null;
        } finally {
          setIsFetchingLocation(false);
        }
      }
      return null;
    },
    [permissionStatus],
  );

  useEffect(() => {
    const fetchAndSetLocation = async () => {
      if (permissionStatus === PermissionsStatus.GRANTED) {
        await fetchLocation();
      }
    };
    fetchAndSetLocation();
  }, [permissionStatus, fetchLocation, isTranslationsLoaded]);

  return {
    permissionStatus,
    location,
    retryPermission: checkPermission,
    isFetchingLocation,
    checkPermission,
    fetchLocation,
  };
};

export default useLocation;

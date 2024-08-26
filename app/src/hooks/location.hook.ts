import { osTypes } from '@app/enums/os-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { showPermissionAlert } from '@app/store/slices/permission-alert-slice';
import { useState, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useDispatch } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import CONFIG from 'react-native-config';
import { IlocationDetails } from '@app/network/services/services.interface';


const useLocation = () => {
  const [permissionStatus, setPermissionStatus] = useState(permissionsStatus.UNKNOWN);
  const localizationText = useLocalization();
  const [location, setLocation] = useState<IlocationDetails | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const dispatch = useDispatch();
  const title = localizationText.LOCATION.PERMISSION_REQUIRED;
  const description = localizationText.LOCATION.LOCATION_PERMISSION_REQUIRED;
  const checkPermission = async (): Promise<boolean> => {
    try {
      const permission = await requestLocationPermission();
      return handlePermissionStatus(permission);
    } catch (error) {
      setPermissionStatus(permissionsStatus.UNAVAILABLE);
      return false;
    }
  }


  useEffect(() => {
    checkPermission()
  }, [])
  

  const handlePermissionStatus =  (status: string): boolean => {
    switch (status) {
      case permissionsStatus.GRANTED:
        setPermissionStatus(permissionsStatus.GRANTED);
        return true;

      case permissionsStatus.DENIED:
        setPermissionStatus(permissionsStatus.DENIED);
        return false;

      case permissionsStatus.BLOCKED:
        setPermissionStatus(permissionsStatus.BLOCKED);
        dispatch(showPermissionAlert({ title, description }));
        return false;

      case permissionsStatus.LIMITED:
        setPermissionStatus(permissionsStatus.LIMITED);
        return false;

      case permissionsStatus.UNAVAILABLE:
      default:
        setPermissionStatus(permissionsStatus.UNAVAILABLE);
        return false;
    }
  }

  
  const requestLocationPermission = useCallback(async (): Promise<string> => {
    if (Platform.OS === osTypes.ANDROID) {
      return await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
      return await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }
  }, []);

  const fetchLocation = useCallback(async (): Promise<IlocationDetails | null> => {

     const hasPermission = await checkPermission()

    if (hasPermission) {
      setIsFetchingLocation(true);
      try {
        const position = await new Promise<Geolocation.GeoPosition>((resolve, reject) => {
          Geolocation.getCurrentPosition(
            resolve,
            reject,
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        });

        const { latitude, longitude } = position.coords;
        const locationDetails: IlocationDetails = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        };
        setLocation(locationDetails);
        return locationDetails;
      } catch (error) {
        console.error('Error fetching location: ', error);
        setPermissionStatus(permissionsStatus.UNAVAILABLE);
        return null;
      } finally {
        setIsFetchingLocation(false);
      }
    }
    return null;
  }, [permissionStatus]);

  const fetchLocationDetails = useCallback(async (latitude: number, longitude: number): Promise<IlocationDetails> => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${CONFIG.GOOGE_MAPS_KEY}`,
      );

      if (response.data.status === 'OK') {
        const addressComponents = response.data.results[0].address_components;
        const locationDetails: IlocationDetails = {};

        addressComponents.forEach((component: any) => {
          const types = component.types;
          if (types.includes('locality')) {
            locationDetails.city = component.long_name;
          }
          if (types.includes('administrative_area_level_2')) {
            locationDetails.district = component.long_name;
          }
          if (types.includes('country')) {
            locationDetails.country = component.long_name;
          }
        });

        return locationDetails;
      } else {
        console.error('Google Maps API failed to fetch location details');
        return {};
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
      return {};
    }
  }, []);

  useEffect(() => {
    const fetchAndSetLocation = async () => {
      if (permissionStatus === permissionsStatus.GRANTED) {
        await fetchLocation();
      }
    };
    fetchAndSetLocation();
  }, [permissionStatus, fetchLocation]);

  return { permissionStatus, location, retryPermission: checkPermission, isFetchingLocation, checkPermission , fetchLocation };
};

export default useLocation;

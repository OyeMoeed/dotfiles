import { osTypes } from '@app/enums/os-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { showPermissionAlert } from '@app/store/slices/permission-alert-slice';
import { useState } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useDispatch } from 'react-redux';

const useLocation = () => {
  const [permissionStatus, setPermissionStatus] = useState(permissionsStatus.UNKNOWN);
  const locaizationText = useLocalization();
  const dispatch = useDispatch();
  const title = locaizationText.LOCATION.PERMISSION_REQUIRED;
  const description = locaizationText.LOCATION.LOCATION_PERMISSION_REQUIRED;
  const checkPermission = async () => {
    try {
      let permission;
      permission = await requestLocationPermission();

      // Handle the permission status
      handlePermissionStatus(permission);
    } catch (error) {
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
        dispatch(showPermissionAlert({ title, description }));

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

  return { permissionStatus, retryPermission: checkPermission };
};

export default useLocation;

// permissionService.js
import { showPermissionAlert } from '@app/store/slices/permission-alert-slice';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useDispatch } from 'react-redux';

const checkLocationPermission = async () => {
  let permission;

  if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  } else {
    permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  }

  try {
    const result = await request(permission);

    switch (result) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.DENIED:
        return false;
      case RESULTS.BLOCKED:
        return false;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
};

// Custom hook for permission check and alert handling
export const useLocationPermission = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const title = t('LOCATION.PERMISSION_REQUIRED');
  const description = t('LOCATION.LOCATION_PERMISSION_REQUIRED');

  const checkAndHandlePermission = async () => {
    const hasLocationPermission = await checkLocationPermission();

    if (!hasLocationPermission) {
      dispatch(showPermissionAlert({ title, description }));
      return false;
    }

    return true;
  };

  return { checkAndHandlePermission };
};

export { checkLocationPermission };

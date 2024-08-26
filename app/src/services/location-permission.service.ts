// permissionService.js
import useLocalization from '@app/localization/hooks/localization.hook';
import { showPermissionAlert } from '@app/store/slices/permission-alert-slice';
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
  const localizationText = useLocalization();
  const title = localizationText.LOCATION.PERMISSION_REQUIRED;
  const description = localizationText.LOCATION.LOCATION_PERMISSION_REQUIRED;

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

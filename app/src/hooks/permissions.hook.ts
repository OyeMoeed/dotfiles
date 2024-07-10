import { osTypes } from '@app/enums/os-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import { permissionTypes } from '@app/enums/permissions-types.enum';
import { goBack } from '@app/navigation/navigation-service.navigation';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, checkNotifications, openSettings, request } from 'react-native-permissions';

/**
 * Custom hook to manage permissions based on the provided permission type.
 * @param {string} permissionType - The type of permission to manage available in permissionTypes.
 * @param {boolean} isPermissionMandatory - Flag indicating whether permission is mandatory. Defaults to false.
 * @param {boolean} shouldGoBackWhenDenied - Flag indicating wether navigate to back or not when permission denied and need to enable permission from settings
 * @returns {Object} An object containing the permission status.
 */
const usePermissions = (permissionType: string, isPermissionMandatory = false, shouldGoBackWhenDenied = false) => {
  const [permissionStatus, setPermissionStatus] = useState(permissionsStatus.UNKNOWN);
  const checkPermission = async () => {
    let permission;
    if (permissionType === permissionTypes.LOCATION) {
      if (Platform.OS === osTypes.ANDROID) {
        permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      } else if (Platform.OS === osTypes.IOS) {
        permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }
    } else if (permissionType === permissionTypes.NOTIFICATION) {
      if (Platform.OS === osTypes.ANDROID && Platform.Version >= 33) {
        permission = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      } else {
        const { status } = await checkNotifications();
        permission = status;
      }
    } else if (permissionType === permissionTypes.CAMERA) {
      if (Platform.OS === osTypes.ANDROID) {
        permission = await request(PERMISSIONS.ANDROID.CAMERA);
      } else if (Platform.OS === osTypes.IOS) {
        permission = await request(PERMISSIONS.IOS.CAMERA);
      }
    } else if (permissionType === permissionTypes.CONTACTS) {
      if (Platform.OS === osTypes.ANDROID) {
        permission = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
      } else if (Platform.OS === osTypes.IOS) {
        permission = await request(PERMISSIONS.IOS.CONTACTS);
      }
    }

    switch (permission) {
      case permissionsStatus.GRANTED:
        setPermissionStatus(permissionsStatus.GRANTED);
        break;
      case permissionsStatus.DENIED:
        setPermissionStatus(permissionsStatus.DENIED);
        break;
      case permissionsStatus.BLOCKED:
        setPermissionStatus(permissionsStatus.BLOCKED);
        if (isPermissionMandatory) {
          if (shouldGoBackWhenDenied) {
            goBack();
          }
          await openSettings();
        }
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
  useEffect(() => {
    checkPermission();
  }, [permissionType, isPermissionMandatory]);

  return { permissionStatus, checkPermission };
};

export default usePermissions;

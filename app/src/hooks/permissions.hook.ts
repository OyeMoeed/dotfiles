import { osTypes } from '@app/enums/os-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import { permissionTypes } from '@app/enums/permissions-types.enum';
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { request, PERMISSIONS, checkNotifications, openSettings } from 'react-native-permissions';

/**
 * Custom hook to manage permissions based on the provided permission type.
 * @param {string} permissionType - The type of permission to manage available in permissionTypes.
 * @param {boolean} isLocationMandatory - Flag indicating whether location permission is mandatory. Defaults to false.
 * @returns {Object} An object containing the permission status.
 */
const usePermissions = (permissionType: string, isLocationMandatory = false) => {
  const [permissionStatus, setPermissionStatus] = useState(permissionsStatus.UNKNOWN);

  useEffect(() => {
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
          permission = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
        } else {
          const { status } = await checkNotifications();
          permission = status;
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
          if (isLocationMandatory && permissionType === permissionTypes.LOCATION) {
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

    checkPermission();
  }, [permissionType, isLocationMandatory]);

  return { permissionStatus };
};

export default usePermissions;

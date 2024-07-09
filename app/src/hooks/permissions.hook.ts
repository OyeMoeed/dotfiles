import { osTypes } from '@app/enums/os-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import PermissionTypes from '@app/enums/permissions-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { getValueFromAsyncStorage, setValueToAsyncStorage } from '@app/utilities/storage-helper.util';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { PERMISSIONS, checkNotifications, openSettings, request } from 'react-native-permissions';

const usePermissions = (permissionType: string, isLocationMandatory = false) => {
  const [permissionStatus, setPermissionStatus] = useState(permissionsStatus.UNKNOWN);
  const [alertShown, setAlertShown] = useState(false);
  const locaizationText = useLocalization();

  useEffect(() => {
    // Check and handle alertShown state from AsyncStorage on component mount
    getValueFromAsyncStorage('alertShown').then((value) => {
      if (value === 'true') {
        // Alert has been shown before
        setAlertShown(true);
        setPermissionStatus(permissionsStatus.DENIED); // Assuming DENIED means the user denied permission
      }
    });
  }, []);

  const checkPermission = useCallback(async () => {
    try {
      let permission = permissionsStatus.UNKNOWN;

      if (permissionType === PermissionTypes.LOCATION) {
        if (Platform.OS === osTypes.ANDROID) {
          permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        } else if (Platform.OS === osTypes.IOS) {
          permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }
      } else if (permissionType === PermissionTypes.NOTIFICATION) {
        if (Platform.OS === osTypes.ANDROID && Platform.Version >= 33) {
          permission = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
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
        case permissionsStatus.BLOCKED:
          setPermissionStatus(permission);

          if (isLocationMandatory && permissionType === PermissionTypes.LOCATION && !alertShown) {
            setAlertShown(true);
            await setValueToAsyncStorage('alertShown', 'true'); // Persist alertShown state

            Alert.alert(
              locaizationText.LOCATION.PERMISSION_ReQUIRED,
              locaizationText.LOCATION.LOCATION_PERMISSION_REQUIRED,
              [
                {
                  text: locaizationText.LOCATION.GO_TO_SETTINGS,
                  onPress: async () => {
                    await openSettings();
                    setAlertShown(false); // Reset alertShown after returning from settings
                    await setValueToAsyncStorage('alertShown', 'false'); // Update alertShown state
                  },
                },
              ],
              { cancelable: false },
            );
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
    } catch (error) {
      setPermissionStatus(permissionsStatus.UNAVAILABLE);
    }
  }, [permissionType, isLocationMandatory, alertShown]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return { permissionStatus, retryPermission: checkPermission };
};

export default usePermissions;

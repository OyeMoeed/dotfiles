import { OsTypes, PermissionsStatus, PermissionTypes } from '@app/enums';
import useLocalization from '@app/localization/hooks/localization.hook';
import { getValueFromAsyncStorage, setValueToAsyncStorage } from '@app/utilities/storage-helper.util';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { PERMISSIONS, check, checkNotifications, openSettings, request } from 'react-native-permissions';

const usePermissions = (permissionType: string, isLocationMandatory = false) => {
  const [permissionStatus, setPermissionStatus] = useState(PermissionsStatus.UNKNOWN);
  const [alertShown, setAlertShown] = useState(false);
  const localizationText = useLocalization();

  useEffect(() => {
    // Check and handle alertShown state from AsyncStorage on component mount
    getValueFromAsyncStorage('alertShown').then((value) => {
      if (value === 'true') {
        setAlertShown(true);
        setPermissionStatus(PermissionsStatus.DENIED); // Assuming DENIED means the user denied permission
      }
    });
  }, []);

  const checkPermission = useCallback(async () => {
    try {
      let permission;

      switch (permissionType) {
        case PermissionTypes.LOCATION:
          switch (Platform.OS) {
            case OsTypes.ANDROID:
              permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
              break;
            case OsTypes.IOS:
              permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
              break;
            default:
              break;
          }
          break;

        case PermissionTypes.NOTIFICATION:
          if (Platform.OS === OsTypes.ANDROID && Platform.Version >= 33) {
            permission = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
          } else {
            const { status } = await checkNotifications();
            permission = status;
          }
          break;

        case PermissionTypes.CAMERA:
          switch (Platform.OS) {
            case OsTypes.ANDROID:
              permission = await request(PERMISSIONS.ANDROID.CAMERA);
              break;
            case OsTypes.IOS:
              permission = await request(PERMISSIONS.IOS.CAMERA);
              break;
            default:
              break;
          }
          break;

        case PermissionTypes.CONTACTS:
          switch (Platform.OS) {
            case OsTypes.ANDROID:
              permission = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
              break;
            case OsTypes.IOS:
              permission = await request(PERMISSIONS.IOS.CONTACTS);
              break;
            default:
              break;
          }
          break;

        case PermissionTypes.BIOMETRIC:
          if (Platform.OS === OsTypes.IOS) {
            permission = await check(PERMISSIONS.IOS.FACE_ID);
            if (permission === PermissionsStatus.DENIED) {
              permission = await request(PERMISSIONS.IOS.FACE_ID);
            }
          }
          break;

        default:
          throw new Error('Unsupported permission type');
      }

      switch (permission) {
        case PermissionsStatus.GRANTED:
          setPermissionStatus(PermissionsStatus.GRANTED);
          break;

        case PermissionsStatus.DENIED:
          setPermissionStatus(PermissionsStatus.DENIED);
          break;

        case PermissionsStatus.BLOCKED:
          setPermissionStatus(PermissionsStatus.BLOCKED);
          if (isLocationMandatory && permissionType === PermissionTypes.LOCATION && !alertShown) {
            setAlertShown(true);
            await setValueToAsyncStorage('alertShown', 'true'); // Persist alertShown state

            Alert.alert(
              localizationText.LOCATION.PERMISSION_REQUIRED,
              localizationText.LOCATION.LOCATION_PERMISSION_REQUIRED,
              [
                {
                  text: localizationText.LOCATION.GO_TO_SETTINGS,
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

        case PermissionsStatus.LIMITED:
          setPermissionStatus(PermissionsStatus.LIMITED);
          break;

        case PermissionsStatus.UNAVAILABLE:
        default:
          setPermissionStatus(PermissionsStatus.UNAVAILABLE);
          break;
      }
    } catch (error) {
      setPermissionStatus(PermissionsStatus.UNAVAILABLE);
    }
  }, [permissionType, isLocationMandatory, alertShown, localizationText, permissionStatus]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return { permissionStatus, retryPermission: checkPermission };
};

export default usePermissions;

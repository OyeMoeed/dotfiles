import { osTypes } from '@app/enums/os-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import PermissionTypes from '@app/enums/permissions-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { useCallback, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, check, checkNotifications, openSettings, request } from 'react-native-permissions';

const usePermissions = (permissionType: string, isLocationMandatory = false) => {
  const [permissionStatus, setPermissionStatus] = useState(permissionsStatus.UNKNOWN);
  const [alertShown, setAlertShown] = useState(false);
  const localizationText = useLocalization();

  enum schemePath {
    LOCATION = 'LOCATION',
  }

  //goto settings
  const handleGotoSetting = () => {
    if (isAndroidOS) {
      openSettings();
    } else {
      Linking.openURL(`App-Prefs:Privacy&path=${schemePath.LOCATION}`);
    }
  };

  const checkPermission = useCallback(async () => {
    try {
      let permission;

      switch (permissionType) {
        case PermissionTypes.LOCATION:
          switch (Platform.OS) {
            case osTypes.ANDROID:
              permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
              break;
            case osTypes.IOS:
              permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
              break;
          }
          break;

        case PermissionTypes.NOTIFICATION:
          if (Platform.OS === osTypes.ANDROID && Platform.Version >= 33) {
            permission = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
          } else {
            const { status } = await checkNotifications();
            permission = status;
          }
          break;

        case PermissionTypes.CAMERA:
          switch (Platform.OS) {
            case osTypes.ANDROID:
              permission = await request(PERMISSIONS.ANDROID.CAMERA);
              break;
            case osTypes.IOS:
              permission = await request(PERMISSIONS.IOS.CAMERA);
              break;
          }
          break;

        case PermissionTypes.CONTACTS:
          switch (Platform.OS) {
            case osTypes.ANDROID:
              permission = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
              break;
            case osTypes.IOS:
              permission = await request(PERMISSIONS.IOS.CONTACTS);
              break;
          }
          break;

        case PermissionTypes.BIOMETRIC:
          if (Platform.OS === osTypes.IOS) {
            permission = await check(PERMISSIONS.IOS.FACE_ID);
            if (permission === permissionsStatus.DENIED) {
              permission = await request(PERMISSIONS.IOS.FACE_ID);
            }
          }
          break;

        default:
          throw new Error('Unsupported permission type');
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
          if (isLocationMandatory && permissionType === PermissionTypes.LOCATION && !alertShown) {
            Alert.alert(
              localizationText.LOCATION.PERMISSION_ReQUIRED,
              localizationText.LOCATION.LOCATION_PERMISSION_REQUIRED,
              [{ text: localizationText.LOCATION.GO_TO_SETTINGS, onPress: handleGotoSetting }],
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
  }, [permissionType, isLocationMandatory, alertShown, localizationText, permissionStatus]);

  return { permissionStatus, retryPermission: checkPermission };
};

export default usePermissions;

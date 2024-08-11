import { DURATIONS } from '@app/constants/constants';
import { osTypes } from '@app/enums/os-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import PermissionTypes from '@app/enums/permissions-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, check, checkNotifications, openSettings, request } from 'react-native-permissions';

const usePermissions = (permissionType: string, isLocationMandatory = false) => {
  const [permissionStatus, setPermissionStatus] = useState(permissionsStatus.UNKNOWN);
  const localizationText = useLocalization();

  // Enum for iOS settings URL schemes
  enum SchemePath {
    LOCATION = 'LOCATION',
  }

  const showSettingAlert = () => {
    setTimeout(() => {
      Alert.alert(
        localizationText.LOCATION.PERMISSION_ReQUIRED,
        localizationText.LOCATION.LOCATION_PERMISSION_REQUIRED,
        [{ text: localizationText.LOCATION.GO_TO_SETTINGS, onPress: handleGotoSetting }],
      );
    }, DURATIONS.MEDIUM);
  };

  // Function to navigate to settings
  const handleGotoSetting = () => {
    if (isAndroidOS) {
      openSettings();
    } else {
      Linking.openURL(`App-Prefs:Privacy&path=${SchemePath.LOCATION}`);
    }
  };

  // Function to check and request permissions
  const checkPermission = async () => {
    try {
      let permission;

      // Request permission based on the type
      switch (permissionType) {
        case PermissionTypes.LOCATION:
          permission = await requestLocationPermission();
          break;

        case PermissionTypes.NOTIFICATION:
          permission = await requestNotificationPermission();
          break;

        case PermissionTypes.CAMERA:
          permission = await requestCameraPermission();
          break;

        case PermissionTypes.CONTACTS:
          permission = await requestContactsPermission();
          break;

        case PermissionTypes.BIOMETRIC:
          permission = await requestBiometricPermission();
          break;

        default:
          throw new Error('Unsupported permission type');
      }

      // Handle the permission status
      handlePermissionStatus(permission);
    } catch (error) {
      console.error('Error checking permission:', error);
      setPermissionStatus(permissionsStatus.UNAVAILABLE);
    }
  };

  // Request functions for specific permissions
  const requestLocationPermission = async () => {
    if (Platform.OS === osTypes.ANDROID) {
      return await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
      return await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === osTypes.ANDROID && Platform.Version >= 33) {
      return await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    } else {
      const { status } = await checkNotifications();
      return status;
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === osTypes.ANDROID) {
      return await request(PERMISSIONS.ANDROID.CAMERA);
    } else {
      return await request(PERMISSIONS.IOS.CAMERA);
    }
  };

  const requestContactsPermission = async () => {
    if (Platform.OS === osTypes.ANDROID) {
      return await request(PERMISSIONS.ANDROID.READ_CONTACTS);
    } else {
      return await request(PERMISSIONS.IOS.CONTACTS);
    }
  };

  const requestBiometricPermission = async () => {
    if (Platform.OS === osTypes.IOS) {
      let status = await check(PERMISSIONS.IOS.FACE_ID);
      if (status === permissionsStatus.DENIED) {
        status = await request(PERMISSIONS.IOS.FACE_ID);
      }
      return status;
    }
  };

  // Handle permission status
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
        showSettingAlert();

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

  return {
    permissionStatus,
    retryPermission: checkPermission,
    handleGotoSetting,
  };
};

export default usePermissions;

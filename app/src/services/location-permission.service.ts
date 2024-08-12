// permissionService.js
import { isAndroidOS } from '@app/utilities/constants';
import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions';

export const checkLocationPermission = async () => {
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
        // Optionally, show a message to the user about why the permission is needed
        return false;
      case RESULTS.BLOCKED:
        // Optionally, redirect to settings or show a message
        return false;
      default:
        return false;
    }
  } catch (error) {
    console.error('Error checking location permission', error);
    return false;
  }
};

enum SchemePath {
  LOCATION = 'LOCATION',
}

const showSettingAlert = () => {
  //TODO update it
  Alert.alert(
    'localizationText.LOCATION.PERMISSION_ReQUIRED',
    'localizationText.LOCATION.LOCATION_PERMISSION_REQUIRED',
    [{ text: 'localizationText.LOCATION.GO_TO_SETTINGS', onPress: handleGotoSetting }],
  );
};

// Function to navigate to settings
const handleGotoSetting = () => {
  if (isAndroidOS) {
    openSettings();
  } else {
    Linking.openURL(`App-Prefs:Privacy&path=${SchemePath.LOCATION}`);
  }
};

export { handleGotoSetting, showSettingAlert };

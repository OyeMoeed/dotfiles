import useLocalization from '@app/localization/hooks/localization.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { BiometricErrorTypes } from '@app/utilities/enums.util';
import { useState } from 'react';
import { Alert, Linking } from 'react-native';
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';
import { BiometricResult, BiometryTypes } from './biometric.interface';

/**
 * Custom hook to handle biometric authentication using React Native Biometrics.
 * This hook checks for the availability of biometric sensors, determines the type of
 * biometric sensor available, and provides a method to request biometric authentication.
 * @returns {object} Object containing biometric status, authentication status, error,
 *   and a function to request authentication.
 */
const useBiometrics = () => {
  const localization = useLocalization();
  const [biometricStatus, setBiometricStatus] = useState<string>('');
  const [authenticated] = useState<boolean>(false); // Authentication status
  const [error, setError] = useState<string | null>(null); // Error state

  const rnBiometrics = new ReactNativeBiometrics();
  const showBiometricErrorAlert = () => {
    Alert.alert(localization.REGISTRATION.BIOMETRIC.ERROR_DESCRIPTION);
  };

  const showPermissionAlert = (message: string, settingsText: string) => {
    Alert.alert(localization.PERMISSIONS.OOPS, message, [
      {
        text: settingsText,
        onPress: Linking.openSettings,
      },
      {
        text: localization.COMMON.CANCEL,
        onPress: () => {},
      },
    ]);
  };

  const getBiometricErrorType = (errorType: string | undefined): BiometricErrorTypes | undefined => {
    if (errorType?.includes(BiometricErrorTypes.NO_IDENTITIES_ENROLLED)) {
      return BiometricErrorTypes.NO_IDENTITIES_ENROLLED;
    }
    if (errorType?.includes(BiometricErrorTypes.USER_DENIED_BIOMETRY)) {
      return BiometricErrorTypes.USER_DENIED_BIOMETRY;
    }

    return undefined;
  };

  // error handling cases for biometeric
  const handleBiometricError = (sensorAvbError: string | undefined) => {
    const errorType = getBiometricErrorType(sensorAvbError);

    switch (errorType) {
      case BiometricErrorTypes.NO_IDENTITIES_ENROLLED:
        showPermissionAlert(
          localization.PERMISSIONS.BIOMETRY_NOT_ENROLLED,
          isAndroidOS
            ? localization.PERMISSIONS.FACEID.ANDROID_GO_TO_SETTINGS
            : localization.PERMISSIONS.FACEID.GO_TO_SETTINGS,
        );
        break;

      default:
        showPermissionAlert(
          isAndroidOS ? localization.PERMISSIONS.FACEID.ANDROID_BLOCKED : localization.PERMISSIONS.FACEID.BLOCKED,
          isAndroidOS
            ? localization.PERMISSIONS.FACEID.ANDROID_GO_TO_SETTINGS
            : localization.PERMISSIONS.FACEID.GO_TO_SETTINGS,
        );
        break;
    }
  };

  const performBiometryOperation = async (
    expectedBiometryType: BiometryTypes,
    promptMessage: string,
  ): Promise<BiometricResult | null> => {
    try {
      const resultObject = await rnBiometrics.isSensorAvailable();
      const { available, biometryType } = resultObject;

      if (available && biometryType === expectedBiometryType) {
        const result = await rnBiometrics.simplePrompt({ promptMessage });
        if (result.success) {
          const resultKey = await rnBiometrics.createKeys();
          const { publicKey } = resultKey;
          return { publicKey };
        }
      }
      return null;
    } catch (errorPerform) {
      return null;
    }
  };

  // android / ios specific functions to call
  const toggleFaceBiometry = async (): Promise<BiometricResult | null> =>
    performBiometryOperation(BiometryTypes.FaceID, localization.PERMISSIONS.CONFIRM_YOUR_IDENTITY);

  const toggleFingerPrint = async (): Promise<BiometricResult | null> =>
    performBiometryOperation(BiometryTypes.Biometrics, localization.PERMISSIONS.CONFIRM_TOUCH_ID);

  // remove biometric passcode
  const removeBiometrics = async () => {
    try {
      const { keysDeleted } = await rnBiometrics.deleteKeys();
      if (!keysDeleted) {
        throw new Error(localization.ERROR.CANNOT_REMOVE_BIOMETRIC_KEYS);
      }
    } catch {
      setError(localization.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  // sensor available options
  const handleBiometricOperation = async (biometryType: BiometryType) => {
    let toggleBiometryFunction;
    switch (biometryType) {
      case BiometryTypes.TouchID:
      case BiometryTypes.Biometrics:
        setBiometricStatus(BiometryTypes.TouchID);
        toggleBiometryFunction = toggleFingerPrint;
        break;
      case BiometryTypes.FaceID:
        setBiometricStatus(BiometryTypes.FaceID);
        toggleBiometryFunction = toggleFaceBiometry;
        break;
      default:
        showBiometricErrorAlert();
        break;
    }
    if (toggleBiometryFunction) {
      try {
        const biometricKeys = await toggleBiometryFunction();
        return biometricKeys;
      } catch (errorBiometric) {
        showBiometricErrorAlert();
        return null;
      }
    }
    return null;
  };

  const checkBiometrics = async () => {
    try {
      const { available, biometryType, error: sensorAvbError } = await rnBiometrics.isSensorAvailable();
      if (available && biometryType) {
        const res = await handleBiometricOperation(biometryType);
        return res;
      }
      handleBiometricError(sensorAvbError);
      return null;
    } catch (e) {
      setError(localization.ERRORS.SOMETHING_WENT_WRONG);
      return null;
    }
  };

  return {
    toggleFaceBiometry,
    biometricStatus,
    authenticated,
    error,
    removeBiometrics,
    checkBiometrics,
  };
};

export default useBiometrics;

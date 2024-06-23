import { useEffect, useState } from 'react';
import useLocalization from '@app/localization/hooks/localization.hook';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

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
  const [authenticated, setAuthenticated] = useState<boolean>(false); // Authentication status
  const [error, setError] = useState<string | null>(null); // Error state

  // Initialize React Native Biometrics
  const rnBiometrics = new ReactNativeBiometrics();

  /**
   * Function to check for the availability of biometric sensors and determine the
   *   type of biometric sensor available.
   */
  const checkBiometrics = async () => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      if (available && biometryType === BiometryTypes.TouchID) {
        setBiometricStatus(BiometryTypes.TouchID);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setBiometricStatus(BiometryTypes.FaceID);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setBiometricStatus(BiometryTypes.Biometrics);
      }
    } catch (e) {
      setError(localization.error_in_biometric);
    }
  };

  useEffect(() => {
    checkBiometrics();
  }, [checkBiometrics]);

  /**
   * Function to request biometric authentication.
   */
  const requestAuthentication = async (userID: string) => {
    try {
      if (!biometricStatus) {
        throw new Error(localization.error_in_authentication);
      }

      const { keysExist } = await rnBiometrics.biometricKeysExist();
      if (!keysExist) {
        throw new Error(localization.biometric_login_not_activated);
      }

      let promptMessage = '';
      switch (biometricStatus) {
        case BiometryTypes.TouchID:
          promptMessage = localization.confirm_with_touch_id;
          break;
        case BiometryTypes.FaceID:
          promptMessage = localization.confirm_with_face_id;
          break;
        case BiometryTypes.Biometrics:
          promptMessage = localization.confirm_with_biometrics;
          break;
        default:
          promptMessage = localization.confirm_with_biometrics;
          break;
      }

      const response = await rnBiometrics.createSignature({
        promptMessage,
        payload: userID,
      });

      if (!response.success) {
        throw new Error(localization.biometric_authentication_failed);
      }

      // call backend user authentication API with {response.signature}
      setAuthenticated(true);
    } catch (e: any) {
      setError(e.message || localization.error_in_authentication);
    }
  };

  /**
   * Function to setup biometric authentication.
   */
  const setupBiometrics = async () => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        throw new Error(localization.no_sensor_available);
      }

      const { keysExist } = await rnBiometrics.biometricKeysExist();
      if (keysExist) {
        throw new Error(localization.biometric_already_enabled);
      }

      /**
       * createKeys() returns object containing {publicKey} that would be
       * passed to backend to store for future use
       * Need to call backend API after this with payload {publicKey}
       */
      await rnBiometrics.createKeys();
    } catch (e: any) {
      setError(e.message || localization.error_in_authentication);
    }
  };

  // remove biometric login
  const removeBiometrics = async () => {
    try {
      const { keysDeleted } = await rnBiometrics.deleteKeys();
      if (!keysDeleted) {
        throw new Error(localization.can_not_remove_biometrics);
      }
      // call user profile update API to backend side to remove already saved public key
    } catch (e: any) {
      setError(e.message || localization.error_in_authentication);
    }
  };

  return {
    biometricStatus,
    authenticated,
    error,
    requestAuthentication,
    setupBiometrics,
    removeBiometrics,
  };
};

export default useBiometrics;

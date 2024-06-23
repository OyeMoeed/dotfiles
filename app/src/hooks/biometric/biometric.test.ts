import { renderHook } from '@testing-library/react-hooks';
import { BiometryTypes } from 'react-native-biometrics';
import useBiometrics from './biometric.hook';

// Mocking react-native-biometrics module
jest.mock('react-native-biometrics', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    isSensorAvailable: jest.fn(() => Promise.resolve({ available: true, biometryType: 'TouchID', error: undefined })),
  })),
  BiometryTypes: {
    TouchID: 'TouchID',
    FaceID: 'FaceID',
    Biometrics: 'Biometrics',
  },
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(
    JSON.stringify({
      confirm_with_touch_id: 'Confirm with Touch ID',
      confirm_with_face_id: 'Confirm with Face ID',
      confirm_with_biometrics: 'Confirm with Biometrics',
      error_in_biometric: 'Error checking biometrics',
      error_in_authentication: 'Error requesting biometric authentication',
      biometric_login_not_activated: 'Biometric login is not activated.',
      biometric_authentication_failed: 'Biometric authentication failed.',
      no_sensor_available: 'No sensor is available',
      biometric_already_enabled: 'Biometric already enabled.',
      can_not_remove_biometrics: 'Can not remove biometrics',
    }),
  ),
}));

describe('useBiometrics', () => {
  it('should set biometricStatus to TouchID when TouchID is available', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBiometrics());
    await waitForNextUpdate();
    expect(result.current.biometricStatus).toEqual(BiometryTypes.TouchID);
    expect(result.current.error).toBeNull();
  });
});

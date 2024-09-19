import { OsTypes, PermissionsStatus, PermissionTypes } from '@app/enums';
import { renderHook } from '@testing-library/react-hooks';
import { Platform } from 'react-native';
import { PERMISSIONS, checkNotifications, openSettings, request } from 'react-native-permissions';
import usePermission from './permissions.hook';

// Mock the necessary functions and objects
jest.mock('react-native-permissions', () => ({
  request: jest.fn(),
  checkNotifications: jest.fn(),
  openSettings: jest.fn(),
  PERMISSIONS: {
    IOS: {
      LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE',
    },
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
      POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS',
    },
  },
}));

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    Version: 33,
  },
  Linking: {
    openSettings: jest.fn(),
  },
}));

describe('usePermission hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return GRANTED for location permission on iOS', async () => {
    request.mockResolvedValueOnce(PermissionsStatus.GRANTED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(PermissionTypes.LOCATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(PermissionsStatus.GRANTED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  });

  it('should return DENIED for location permission on iOS', async () => {
    request.mockResolvedValueOnce(PermissionsStatus.DENIED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(PermissionTypes.LOCATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(PermissionsStatus.DENIED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  });

  it('should return BLOCKED for location permission on iOS and open settings if mandatory', async () => {
    request.mockResolvedValueOnce(PermissionsStatus.BLOCKED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(PermissionTypes.LOCATION, true));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(PermissionsStatus.BLOCKED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    expect(openSettings).toHaveBeenCalled();
  });

  it('should return GRANTED for notification permission on Android', async () => {
    Platform.OS = OsTypes.ANDROID;
    request.mockResolvedValueOnce(PermissionsStatus.GRANTED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(PermissionTypes.NOTIFICATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(PermissionsStatus.GRANTED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  });

  it('should return DENIED for notification permission on Android', async () => {
    Platform.OS = OsTypes.ANDROID;
    request.mockResolvedValueOnce(PermissionsStatus.DENIED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(PermissionTypes.NOTIFICATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(PermissionsStatus.DENIED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  });

  it('should return status from checkNotifications for notification permission on iOS', async () => {
    Platform.OS = OsTypes.IOS;
    checkNotifications.mockResolvedValueOnce({ status: PermissionsStatus.GRANTED });

    const { result, waitForNextUpdate } = renderHook(() => usePermission(PermissionTypes.NOTIFICATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(PermissionsStatus.GRANTED);
    expect(checkNotifications).toHaveBeenCalled();
  });
});

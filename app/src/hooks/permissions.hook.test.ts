import { renderHook } from '@testing-library/react-hooks';
import { request, checkNotifications, openSettings, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';
import usePermission from './permissions.hook';
import { osTypes } from '@app/enums/os-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import { permissionTypes } from '@app/enums/permissions-types.enum';

// Mock the necessary functions and objects
jest.mock('react-native-permissions', () => ({
  request: jest.fn(),
  checkNotifications: jest.fn(),
  openSettings: jest.fn(),
  PERMISSIONS: {
    IOS: {
      LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE'
    },
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
      POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS'
    }
  }
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
    request.mockResolvedValueOnce(permissionsStatus.GRANTED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(permissionTypes.LOCATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(permissionsStatus.GRANTED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  });

  it('should return DENIED for location permission on iOS', async () => {
    request.mockResolvedValueOnce(permissionsStatus.DENIED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(permissionTypes.LOCATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(permissionsStatus.DENIED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  });

  it('should return BLOCKED for location permission on iOS and open settings if mandatory', async () => {
    request.mockResolvedValueOnce(permissionsStatus.BLOCKED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(permissionTypes.LOCATION, true));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(permissionsStatus.BLOCKED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    expect(openSettings).toHaveBeenCalled();
  });

  it('should return GRANTED for notification permission on Android', async () => {
    Platform.OS = osTypes.ANDROID;
    request.mockResolvedValueOnce(permissionsStatus.GRANTED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(permissionTypes.NOTIFICATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(permissionsStatus.GRANTED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  });

  it('should return DENIED for notification permission on Android', async () => {
    Platform.OS = osTypes.ANDROID;
    request.mockResolvedValueOnce(permissionsStatus.DENIED);

    const { result, waitForNextUpdate } = renderHook(() => usePermission(permissionTypes.NOTIFICATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(permissionsStatus.DENIED);
    expect(request).toHaveBeenCalledWith(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  });

  it('should return status from checkNotifications for notification permission on iOS', async () => {
    Platform.OS = osTypes.IOS;
    checkNotifications.mockResolvedValueOnce({ status: permissionsStatus.GRANTED });

    const { result, waitForNextUpdate } = renderHook(() => usePermission(permissionTypes.NOTIFICATION));

    await waitForNextUpdate();

    expect(result.current.permissionStatus).toBe(permissionsStatus.GRANTED);
    expect(checkNotifications).toHaveBeenCalled();
  });
});

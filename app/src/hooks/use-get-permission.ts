import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { check, openSettings, Permission, PermissionStatus, request, RESULTS } from 'react-native-permissions';
import { useAppState } from './use-appstate.hook';

const useGetPermission = ({
  permission,
  callOnMount,
  ref,
  onSuccess,
}: {
  permission: Permission;
  callOnMount?: boolean;
  ref?: RefObject<BottomSheetModal>;
  onSuccess?: () => void;
}) => {
  const [permissionResult, setPermissionResult] = useState<PermissionStatus | null>(null);

  const onPermissionGranted = useCallback(() => {
    onSuccess?.();
    setTimeout(() => {
      ref?.current?.close();
    }, 100);
  }, [onSuccess, ref]);

  const presentBottomSheet = useCallback(() => {
    setTimeout(() => {
      ref?.current?.present();
    }, 100);
  }, [ref]);

  const checkPermission = useCallback(async () => {
    try {
      const checkResult = await check(permission);
      if (checkResult === RESULTS.GRANTED) {
        onPermissionGranted();
      } else {
        presentBottomSheet();
      }
      return checkResult;
    } catch (error) {
      // empty
      return null;
    }
  }, [onPermissionGranted, permission, presentBottomSheet]);

  const requestPermission = useCallback(async () => {
    try {
      const checkResult = await request(permission);
      setPermissionResult(checkResult);
      if (checkResult === RESULTS.GRANTED) {
        onPermissionGranted();
      } else {
        openSettings();
      }
      return checkResult;
    } catch (error) {
      // empty
      return null;
    }
  }, [onPermissionGranted, permission]);

  useAppState(checkPermission, { current: !!callOnMount });

  useEffect(() => {
    if (callOnMount) {
      checkPermission();
    }
  }, [callOnMount, checkPermission, requestPermission]);

  return { checkPermission, requestPermission, permissionResult };
};

export default useGetPermission;

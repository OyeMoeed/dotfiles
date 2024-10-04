import { isAndroidOS } from '@app/utilities/constants';
import { useState, useEffect } from 'react';
import { AppState, AppStateStatus, NativeEventSubscription } from 'react-native';

const isAppInactiveOrInBackground = (appState: AppStateStatus) => appState?.match(/inactive|background/);

const useAppState = (AppStateChangedCallback?: () => void, shouldHandleBackground = { current: true }) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscriptions: NativeEventSubscription[] = [];

    if (isAndroidOS) {
      subscriptions.push(
        AppState.addEventListener('focus', () => {
          if (shouldHandleBackground?.current) {
            AppStateChangedCallback?.();
          }
        }),
      );
    }

    subscriptions.push(
      AppState.addEventListener('change', (nextAppState) => {
        if (isAppInactiveOrInBackground(appState) && nextAppState === 'active' && shouldHandleBackground?.current) {
          AppStateChangedCallback?.();
        }
        setAppState(nextAppState);
      }),
    );

    return () => {
      subscriptions.forEach((el) => el?.remove());
    };
  }, [AppStateChangedCallback, shouldHandleBackground, appState]);

  return {
    appState,
  };
};

export { isAppInactiveOrInBackground, useAppState };

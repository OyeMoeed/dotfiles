import { isAndroidOS } from '@app/utilities/constants';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!isAndroidOS) return;

      const onFocus = () => {
        if (appState === 'background' || appState === 'inactive') {
          setAppState('active');
        }
      };

      const onBlur = () => {
        setAppState('inactive');
      };

      const focusListener = AppState.addEventListener('focus', onFocus);
      const blurListener = AppState.addEventListener('blur', onBlur);

      return () => {
        focusListener.remove();
        blurListener.remove();
      };
    }, [appState]),
  );

  return appState;
};

export default useAppState;

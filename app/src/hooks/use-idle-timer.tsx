import {
  hideIdleTimerBottomSheet,
  showIdleTimerBottomSheet,
  restartSessionTimer,
} from '@app/store/slices/idle-timer-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { useEffect, useRef } from 'react';

const useIdleTimer = () => {
  const dispatch = useTypedDispatch();
  const timerId = useRef<any>();
  const timeForInactivityInMinutes = useTypedSelector((state) => state.idleTimerSlice.sessionTime);
  const isResetTimer = useTypedSelector((state) => state.idleTimerSlice.reset);
  const isIdleTimerVisible = useTypedSelector((state) => state.idleTimerSlice.isSessionTimeout);

  const resetInactivityTimeout = () => {
    dispatch(restartSessionTimer(false));
    if (isIdleTimerVisible) {
      dispatch(hideIdleTimerBottomSheet());
    }

    clearTimeout(timerId.current);
    timerId.current = setTimeout(
      () => {
        dispatch(showIdleTimerBottomSheet());
      },
      Number(timeForInactivityInMinutes) * 60 * 1000,
    );
  };

  useEffect(() => {
    resetInactivityTimeout();
  }, [isResetTimer]);
};

export default useIdleTimer;

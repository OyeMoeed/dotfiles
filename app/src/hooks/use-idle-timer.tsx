import { hideIdleTimerBottomSheet, showIdleTimerBottomSheet, startTimer } from '@app/store/slices/idle-timer-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { useEffect, useRef } from 'react';

const useIdleTimer = () => {
  const dispatch = useTypedDispatch();
  const timerId = useRef<any>();
  const timeForInactivityInSecond = useTypedSelector((state) => state.idleTimerSlice.timer);
  const isResetTimer = useTypedSelector((state) => state.idleTimerSlice.reset);

  const resetInactivityTimeout = () => {
    dispatch(startTimer(false));
    dispatch(hideIdleTimerBottomSheet());

    clearTimeout(timerId.current);
    timerId.current = setTimeout(
      () => {
        dispatch(showIdleTimerBottomSheet());
      },
      Number(timeForInactivityInSecond) * 60 * 1000,
    );
  };

  useEffect(() => {
    resetInactivityTimeout();
  }, [isResetTimer]);
};

export default useIdleTimer;

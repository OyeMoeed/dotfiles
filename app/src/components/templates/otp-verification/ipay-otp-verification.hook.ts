import { DURATIONS, INITIAL_TIMER } from '@app/constants/constants';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

export const useOtpVerification = (setOtp: (otp: string) => void, setOtpError: (error: boolean) => void) => {
  const [counter, setCounter] = useState(INITIAL_TIMER);
  const endTimeRef = useRef<number>(Date.now() + INITIAL_TIMER * 1000);
  const timerRef = useRef<any>(null);

  const updateCounter = () => {
    const remainingTime = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
    setCounter(remainingTime);
    if (remainingTime === 0) {
      clearInterval(timerRef.current);
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(updateCounter, 1000);
  };

  const resetInterval = () => {
    clearInterval(timerRef.current);
    endTimeRef.current = Date.now() + INITIAL_TIMER * 1000;
    setCounter(INITIAL_TIMER);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  useImperativeHandle(timerRef, () => ({
    resetInterval,
  }));

  const handleRestart = () => {
    resetInterval();
  };

  const onChangeText = (text: string) => {
    setOtp(text);
    setOtpError(false);
  };

  return { counter, handleRestart, onChangeText };
};
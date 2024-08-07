import { DURATIONS, INITIAL_TIMER } from '@app/constants/constants';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

export const useOtpVerification = (setOtp: (otp: string) => void, setOtpError: (error: boolean) => void) => {
  const [counter, setCounter] = useState(INITIAL_TIMER);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevCounter - 1;
      });
    }, DURATIONS.LONG);

    return () => clearInterval(timerRef.current);
  }, []);

  useImperativeHandle(timerRef, () => ({
    resetInterval: () => {
      clearInterval(timerRef.current);
      setCounter(INITIAL_TIMER);
    },
  }));

  const handleRestart = () => {
    setCounter(INITIAL_TIMER);
  };

  const onChangeText = (text: string) => {
    setOtp(text);
    setOtpError(false);
  };

  return { counter, handleRestart, onChangeText };
};

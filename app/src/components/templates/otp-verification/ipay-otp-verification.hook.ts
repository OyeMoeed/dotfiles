import constants from '@app/constants/constants';
import { isAndroidOS } from '@app/utilities/constants';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { SMS_EVENT } from 'rn-sms-retriever';

const useOtpVerification = (
  setOtp: (otp: string) => void,
  setOtpError: (error: boolean) => void,
  timeout: number,
  otp: string,
  onConfirmOtp?: () => void,
) => {
  const INITIAL_TIMER = timeout || constants.INITIAL_TIMER;
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

  const clearTimer = () => {
    clearInterval(timerRef.current);
  };

  const startTimer = () => {
    timerRef.current = setInterval(updateCounter, 1000);
  };

  const resetInterval = () => {
    clearTimer();
    endTimeRef.current = Date.now() + INITIAL_TIMER * 1000;
    setCounter(INITIAL_TIMER);
    startTimer();
  };

  useEffect(() => {
    startTimer();

    return () => clearTimer();
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

  useEffect(() => {
    let smsListener: undefined | EmitterSubscription;
    const listen = async () => {
      try {
        smsListener = DeviceEventEmitter.addListener(SMS_EVENT, (smsTextMessage: string) => {
          const code = smsTextMessage?.replace(/[^0-9]/g, '');
          if (code?.length === 4) {
            setOtp(code);
          }
        });
      } catch {
        /* empty */
      }
    };
    if (isAndroidOS) listen();

    return () => {
      smsListener?.remove?.();
    };
  }, [setOtp]);

  useEffect(() => {
    if (otp?.length === 4) {
      onConfirmOtp?.();
    }
  }, [otp]);

  return { counter, handleRestart, onChangeText, startTimer, clearTimer };
};

export default useOtpVerification;

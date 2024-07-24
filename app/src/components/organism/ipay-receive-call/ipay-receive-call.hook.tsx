import { DURATIONS, INITIAL_TIMER, PROGRESS_INCREMENT_FACTOR } from '@app/constants/constants';
import { useCallback, useEffect, useState } from 'react';


const useTimer = () => {
  const [gradientWidth, setGradientWidth] = useState('0%');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIMER);  
  const [expired, setExpired] = useState(false);
  let interval: NodeJS.Timeout | null = null;

  const startTimer = useCallback(() => {
    setTimeLeft(DURATIONS.LONG);
    let width = 0;
    interval = setInterval(() => {
      width += PROGRESS_INCREMENT_FACTOR.MEDIUM;
      setGradientWidth(`${width}%`);
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft - 1;
        if (newTimeLeft <= 0) {
          if (interval) {
            clearInterval(interval);
          }
          setExpired(true);
          setGradientWidth('0%');
          return 0;
        }
        return newTimeLeft;
      });
    }, DURATIONS.LONG);
  }, [DURATIONS.LONG]);

   const handleRequestAgain = useCallback(() => {
     setExpired(false);
     setGradientWidth('0%');
     setTimeLeft(INITIAL_TIMER);
   }, [INITIAL_TIMER]);

  useEffect(() => {
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return { gradientWidth, timeLeft, expired, startTimer, handleRequestAgain };
};

export default useTimer;

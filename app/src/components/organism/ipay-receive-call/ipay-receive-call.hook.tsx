import { DURATIONS, INITIAL_TIMER, PROGRESS_INCREMENT_FACTOR } from '@app/constants/constants';
import { ActivationMethods } from '@app/network/services/international-transfer/activate-international-beneficiary';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import { useCallback, useEffect, useState } from 'react';

const useCallReceiverTimer = (
  activateInternationalBeneficiary: (activationMethod: ActivationMethods) => Promise<ApiResponseStatusType | void>,
) => {
  const [gradientWidth, setGradientWidth] = useState('0%');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIMER);
  const [expired, setExpired] = useState(false);
  // TODO: fix NodeJs types
  // eslint-disable-next-line no-undef
  let interval: NodeJS.Timeout | null = null;

  const startTimer = useCallback(() => {
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

  const handleRequestAgain = useCallback(async () => {
    const response = await activateInternationalBeneficiary(ActivationMethods.CB);

    if (response === ApiResponseStatusType.SUCCESS) {
      setExpired(false);
      setGradientWidth('0%');
      setTimeLeft(INITIAL_TIMER);
    }
  }, [INITIAL_TIMER]);

  useEffect(
    () => () => {
      if (interval) {
        clearInterval(interval);
      }
    },
    [],
  );

  return { gradientWidth, timeLeft, expired, startTimer, handleRequestAgain };
};

export default useCallReceiverTimer;

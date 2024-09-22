import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { navigateAndReset } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch } from '@app/store/store';
import { OnBoardInterface } from '@app/screens/auth/onboarding/user-onboarding.screen';

const useStepper = ({ listRef, length }: { listRef: React.RefObject<FlatList<OnBoardInterface>>; length: number }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const dispatch = useTypedDispatch();
  const hideWalkThrough = useCallback(() => {
    dispatch(setAppData({ isFirstTime: false }));
  }, [dispatch]);

  const skip = useCallback(() => {
    hideWalkThrough();
    setCurrentStep(length);
    listRef?.current?.scrollToIndex({ index: length - 1, animated: true });
  }, [hideWalkThrough, length, listRef]);

  const handleNext = useCallback(
    (nextIndex: number, disableAnimation?: boolean) => {
      if (nextIndex === 3) {
        hideWalkThrough();
        navigateAndReset(screenNames.MOBILE_IQAMA_VERIFICATION);
      } else {
        if (!disableAnimation) {
          listRef?.current?.scrollToIndex({ index: nextIndex, animated: true });
        }
        setCurrentStep(nextIndex);
      }
    },
    [hideWalkThrough, listRef],
  );

  return {
    skip,
    handleNext,
    currentStep,
  };
};

export default useStepper;

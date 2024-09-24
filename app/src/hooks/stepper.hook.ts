import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { navigateAndReset } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch } from '@app/store/store';
import { OnBoardInterface } from '@app/screens/auth/onboarding/user-onboarding.screen';

const useStepper = ({ listRef }: { listRef: React.RefObject<FlatList<OnBoardInterface>> }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const dispatch = useTypedDispatch();
  const hideWalkThrough = useCallback(() => {
    dispatch(setAppData({ isFirstTime: false }));
  }, [dispatch]);

  const skip = useCallback(() => {
    hideWalkThrough();
    navigateAndReset(screenNames.MOBILE_IQAMA_VERIFICATION);
  }, [hideWalkThrough]);

  const handleNext = useCallback(
    (nextIndex: number, disableAnimation?: boolean) => {
      if (nextIndex === 3) {
        skip();
      } else {
        if (!disableAnimation) {
          listRef?.current?.scrollToIndex({ index: nextIndex, animated: true });
        }
        setCurrentStep(nextIndex);
      }
    },
    [listRef, skip],
  );

  return {
    skip,
    handleNext,
    currentStep,
  };
};

export default useStepper;

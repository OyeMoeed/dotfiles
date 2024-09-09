import { navigateAndReset } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch } from '@app/store/store';
import { useState } from 'react';
import OnboardingSteps from '../screens/auth/onboarding/onboarding-enum.util';

export const useStepper = () => {
  const [currentView, setCurrentView] = useState(OnboardingSteps.OpportunitiesStep);
  const dispatch = useTypedDispatch();
  const hideWalkThrough = () => {
    dispatch(setAppData({ isFirstTime: false }));
  };
  const skip = () => {
    hideWalkThrough();
    setCurrentView(OnboardingSteps.PurchasesStep);
  };

  const handleNext = (view: OnboardingSteps) => {
    setCurrentView(view);
  };

  const getStarted = () => {
    hideWalkThrough();
    navigateAndReset(screenNames.MOBILE_IQAMA_VERIFICATION);
  };

  return {
    skip,
    handleNext,
    currentView,
    getStarted,
  };
};

import { OnboardingSteps } from '../screens/auth/onboarding/onboarding-enum.util';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';

import { useState } from 'react';

export const useStepper = () => {
  const [currentView, setCurrentView] = useState(OnboardingSteps.OpportunitiesStep);

  const skip = () => {
    setCurrentView(OnboardingSteps.PurchasesStep);
  };

  const handleNext = (view: OnboardingSteps) => {
    setCurrentView(view);
  };

  const getStarted = () => {
    navigate(screenNames.MOBILE_IQAMA_VERIFICATION)
  };

  return {
    skip,
    handleNext,
    currentView,
    getStarted
  };
};

import React from 'react';
import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';

export interface IPayAnimatedHeaderProps {
  testID?: string;
  type: OnboardingSteps;
  children: React.ReactNode;
  runAnimation: boolean;
}

import React from 'react';
import { render } from '@testing-library/react-native';
import IPayAnimatedText from './ipay-animated-text.component';
import { OnboardingSteps } from '@app/screens/auth/onboarding/onboarding-enum.util';

// Mock components and utilities
jest.mock('@app/components/atoms', () => ({
  IPayAnimatedView: jest.fn(({ children }) => children),
  IPaySubHeadlineText: jest.fn(({ text }) => text),
  IPayTitle1Text: jest.fn(({ text }) => text),
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onboarding_one: { onbaordingTitle: 'Onboarding Step 1' },
    onboarding_two: { onbaordingTitle: 'Onboarding Step 2' },
  })),
}));

jest.mock('@app/constants/constants', () => ({
  ANIMATION_DURATIONS: {
    duration300: 300,
    duration200: 200,
    duration100: 100,
  },
}));

describe('IPayAnimatedText', () => {
  const defaultProps = {
    type: OnboardingSteps.OpportunitiesStep,
    title: 'Test Title',
    description: 'Test Description',
    styles: {},
  };

  it('renders correctly with Onboarding1 step', () => {
    const { getByText } = render(<IPayAnimatedText {...defaultProps} />);

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
  });

  it('renders correctly with Onboarding2 step', () => {
    const { getByText } = render(<IPayAnimatedText {...defaultProps} type={OnboardingSteps.SendAndReceiveStep} />);

    expect(getByText('Onboarding Step 1')).toBeTruthy();
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
  });

  it('renders correctly with Onboarding3 step', () => {
    const { getByText } = render(<IPayAnimatedText {...defaultProps} type={OnboardingSteps.PurchasesStep} />);

    expect(getByText('Onboarding Step 2')).toBeTruthy();
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
  });

  it('applies correct fade animation for non-Onboarding1 steps', () => {
    render(<IPayAnimatedText {...defaultProps} type={OnboardingSteps.SendAndReceiveStep} />);

    // Further checks can be added here to validate the animations
  });
});

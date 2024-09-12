import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IPayAnimatedButton from './ipay-animated-button.component';
import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';

describe('IPayAnimatedButton', () => {
  const defaultProps = {
    type: OnboardingSteps.OpportunitiesStep,
    onNext: jest.fn(),
    onSkip: jest.fn(),
    skipText: 'Skip',
    nextText: 'Next',
    testID: 'ipay-animated-button',
  };

  it('renders correctly for OpportunitiesStep', () => {
    const { getByText, queryByText } = render(<IPayAnimatedButton {...defaultProps} />);

    expect(getByText('Skip')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
    expect(queryByText('Skip')).not.toBeNull();
  });

  it('renders correctly for PurchasesStep', () => {
    const props = { ...defaultProps, type: OnboardingSteps.PurchasesStep };
    const { getByText, queryByText } = render(<IPayAnimatedButton {...props} />);

    expect(getByText('Next')).toBeTruthy();
    expect(queryByText('Skip')).toBeNull();
  });

  it('calls onNext when the next button is pressed', () => {
    const { getByText } = render(<IPayAnimatedButton {...defaultProps} />);

    const nextButton = getByText('Next');
    fireEvent.press(nextButton);

    expect(defaultProps.onNext).toHaveBeenCalled();
  });

  it('calls onSkip when the skip button is pressed', () => {
    const { getByText } = render(<IPayAnimatedButton {...defaultProps} />);

    const skipButton = getByText('Skip');
    fireEvent.press(skipButton);

    expect(defaultProps.onSkip).toHaveBeenCalled();
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import IPayStepIndicator from './ipay-step-indicator.component';

// Mock useTheme hook to provide colors for styles
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: 'blue',
      secondary: 'grey',
    },
  }),
}));

describe('IPayStepIndicator', () => {
  it('renders the correct number of steps', () => {
    const steps = 5;
    const currentStep = 3;
    const { getAllByTestId } = render(<IPayStepIndicator steps={steps} currentStep={currentStep} testID="test" />);

    const stepViews = getAllByTestId(/test-step-indicator-step-/);
    expect(stepViews).toHaveLength(steps);
  });

  it('applies the correct styles based on the current step', () => {
    const steps = 4;
    const currentStep = 2;
    const { getByTestId } = render(<IPayStepIndicator steps={steps} currentStep={currentStep} testID="test" />);

    for (let i = 1; i <= steps; i++) {
      const stepView = getByTestId(`test-step-indicator-step-${i}`);
      const style = stepView.props.style;

      if (i === currentStep) {
        expect(style).toContainEqual({ backgroundColor: 'blue' });
      } else {
        expect(style).toContainEqual({ backgroundColor: 'grey' });
      }
    }
  });
});

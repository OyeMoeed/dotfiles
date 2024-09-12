import { render } from '@testing-library/react-native';
import IPayAnimatedImage from './ipay-animated-image.component';
import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';
import { animateValue } from '@app/ipay-animations/ipay-animations';

// Mock components and utilities
jest.mock('@app/components/atoms', () => ({
  IPayAnimatedView: jest.fn(({ children }) => children),
  IPayImage: jest.fn(() => null),
}));

describe('IPayAnimatedImage', () => {
  const defaultProps = {
    type: OnboardingSteps.OpportunitiesStep,
    image: 'test-image',
    styles: {},
  };

  it('renders correctly with Onboarding1 step', () => {
    const { getByTestId } = render(<IPayAnimatedImage {...defaultProps} />);

    expect(getByTestId('ipay-image')).toBeTruthy();
  });

  it('renders correctly with Onboarding2 step', () => {
    const { getByTestId } = render(<IPayAnimatedImage {...defaultProps} type={OnboardingSteps.SendAndReceiveStep} />);

    expect(getByTestId('ipay-image')).toBeTruthy();
  });

  it('applies correct animation for Onboarding1 step', () => {
    render(<IPayAnimatedImage {...defaultProps} />);

    expect(animateValue).toHaveBeenCalledWith(expect.any(Object), 1);
  });
});

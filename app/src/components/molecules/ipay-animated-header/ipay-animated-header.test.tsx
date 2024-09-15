import { render } from '@testing-library/react-native';
import IPayAnimatedHeader from './ipay-animated-header.component';
import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';
import { Text } from 'react-native';

// Mock components and utilities
jest.mock('@app/components/atoms', () => ({
  IPayAnimatedView: jest.fn(({ children }) => children),
}));

describe('IPayAnimatedHeader', () => {
  const ChildrenComponent = () => <Text>Header Content</Text>;

  it('renders correctly with Onboarding1 step', () => {
    const { getByText } = render(
      <IPayAnimatedHeader type={OnboardingSteps.OpportunitiesStep}>
        <ChildrenComponent />
      </IPayAnimatedHeader>,
    );

    expect(getByText('Header Content')).not.toBeNull();
  });

  it('renders correctly with non-Onboarding1 step', () => {
    const { getByText } = render(
      <IPayAnimatedHeader type={OnboardingSteps.SendAndReceiveStep}>
        <ChildrenComponent />
      </IPayAnimatedHeader>,
    );

    expect(getByText('Header Content')).not.toBeNull();
  });
});

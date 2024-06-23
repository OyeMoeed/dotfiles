import { render } from '@testing-library/react-native';
import ConfirmPasscode from './confirm-passcode.screen';

// Mock the navigation service
jest.mock('@app/navigation/navigation-service.navigation', () => ({
  navigate: jest.fn(),
}));

jest.mock('@app/components/atoms', () => ({
  IPayView: ({ children }: any) => <>{children}</>,
}));
jest.mock('@app/components/molecules', () => ({
  IPayHeader: () => null,
  IPayPageDescriptionText: () => null,
}));
jest.mock('@app/components/organism', () => ({
  IPayPasscode: ({ onEnterPassCode }: any) => (
    <input testID="passcode-input" onChange={(e) => onEnterPassCode(e.target.value)} />
  ),
}));
jest.mock('@app/components/templates', () => ({
  IPaySafeAreaView: ({ children }: any) => <>{children}</>,
}));
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  icons: {
    bulkLock: () => null,
  },
}));
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  confirm_passcode: 'Confirm Passcode',
  enter_passcode_again: 'Enter your passcode again',
}));
jest.mock('react-native-size-matters', () => ({
  scale: (size: number) => size,
  verticalScale: (size: number) => size,
}));

describe('ConfirmPasscode Component', () => {
  const route = { params: { passcode: '1234' } };

  it('renders correctly', () => {
    const { getByTestId } = render(<ConfirmPasscode route={route} />);
    expect(getByTestId('passcode-input')).toBeTruthy();
  });
});

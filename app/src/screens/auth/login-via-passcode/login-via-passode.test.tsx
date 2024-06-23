import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import LoginViaPasscode from './login-via-passcode.screen';

// Mock components
const MockConfirmPasscodeComponent = React.forwardRef(() => null);
const MockSetPasscodeComponent = React.forwardRef(() => null);
const MockHelpCenterComponent = React.forwardRef(() => null);
const MockIdentityConfirmationComponent = React.forwardRef(() => null);
const MockOtpVerificationComponent = React.forwardRef(() => null);

const MockIPayBottomSheet = React.forwardRef((props: any, ref) => <>{props.children}</>);
const MockIPayPasscode = ({ onEnterPassCode, ...props }: any) => (
  <input testID="IPayPasscode" onChange={(e) => onEnterPassCode(e.target.value)} {...props} />
);

// Mock dependencies
jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());
jest.mock('@app/styles/hooks/theme.hook', () => jest.fn());
jest.mock('@app/navigation/navigation-service.navigation', () => ({
  navigate: jest.fn(),
}));
jest.mock('@app/assets/images', () => ({
  countryFlag: 'mockCountryFlagImage',
}));
jest.mock('../forgot-passcode/confirm-passcode.compoennt', () => MockConfirmPasscodeComponent);
jest.mock('../forgot-passcode/create-passcode.component', () => MockSetPasscodeComponent);
jest.mock('../forgot-passcode/help-center.component', () => MockHelpCenterComponent);
jest.mock('../forgot-passcode/identity-conirmation.component', () => MockIdentityConfirmationComponent);
jest.mock('../forgot-passcode/otp-verification.component', () => MockOtpVerificationComponent);

// Mocked component imports for atoms, molecules, organisms, and templates
jest.mock('@app/components/atoms', () => ({
  IPayCaption1Text: (props: any) => <>{props.text}</>,
  IPayImage: (props: any) => <>{props.image}</>,
  IPaySubHeadlineText: (props: any) => <>{props.text}</>,
  IPayView: (props: any) => <>{props.children}</>,
}));
jest.mock('@app/components/molecules', () => ({
  IPayGradientText: (props: any) => <>{props.text}</>,
  IPayHeader: (props: any) => <>{props.children}</>,
}));
jest.mock('@app/components/organism', () => ({
  IPayBottomSheet: MockIPayBottomSheet,
  IPayPasscode: MockIPayPasscode,
}));
jest.mock('@app/components/templates', () => ({
  IPaySafeAreaView: (props: any) => <>{props.children}</>,
}));

// Mocking the components used in LoginViaPasscode
jest.mock('@app/components/organism', () => ({
  IPayBottomSheet: (props) => <div>{props.children}</div>,
}));

jest.mock('@app/components/molecules/IPayPasscode', () => ({
  IPayPasscode: (props) => <div>{props.children}</div>,
}));

describe('LoginViaPasscode', () => {
  const mockLocalization = {
    welcome_back: 'Welcome back!',
    enter_your_passcode: 'Enter your passcode',
    forget_password: 'Forgot password?',
    help_center: 'Help Center',
  };
  const mockTheme = {
    colors: {
      primary: {
        primary500: '#000000',
        primary800: '#ffffff',
      },
      secondary: {
        secondary300: '#ff0000',
      },
    },
    icons: {
      bulkLock: () => <></>,
    },
  };

  beforeEach(() => {
    (useLocalization as jest.Mock).mockReturnValue(mockLocalization);
    (useTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<LoginViaPasscode route={{}} />);

    expect(getByText(mockLocalization.welcome_back)).toBeTruthy();
    expect(getByText(mockLocalization.enter_your_passcode)).toBeTruthy();
  });

  it('handles passcode input correctly', () => {
    const { getByTestId } = render(<LoginViaPasscode route={{}} />);
    const passcodeInput = getByTestId('IPayPasscode');

    fireEvent.changeText(passcodeInput, '1234');

    // Ensure the passcode input was handled and navigate was called appropriately
    expect(navigate).toHaveBeenCalledWith('PASSCODE_RECREATED');
  });

  it('opens the forgot password bottom sheet when forget password is pressed', () => {
    const { getByTestId } = render(<LoginViaPasscode route={{}} />);
    const forgetPasswordButton = getByTestId('IPayPasscode');

    fireEvent.press(forgetPasswordButton);

    // Check if the bottom sheet is rendered
    expect(getByTestId('IPayBottomSheet')).toBeTruthy();
  });
});

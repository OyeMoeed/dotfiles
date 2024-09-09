import { render } from '@testing-library/react-native';
import IPayOtpVerification from './ipay-otp-verification.component';

// Mock dependencies
jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    colors: {
      primary: { primary900: '' },
      natural: { natural500: '#000000' },
      redPalette: { red500: '' },
    },
    icons: {
      message: jest.fn().mockReturnValue('MessageIcon'), // Mock icons as needed
      refresh: jest.fn().mockReturnValue('RefreshIcon'),
    },
  }),
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    enter_received_code: 'Enter the received code:', // Mock localization text as needed
    enter_four_digit_otp: 'Enter the four-digit OTP for:', // Mock more localization text if needed
    code_expires_in: 'Code expires in', // Mock more localization text if needed
    send_code_again: 'Send code again', // Mock more localization text if needed
    confirm: 'Confirm', // Mock more localization text if needed
  }),
}));

describe('IPayOtpVerification', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<IPayOtpVerification testID="otp-verification" />);
    const container = getByTestId('otp-verification');
    expect(container).toBeTruthy();
  });
});

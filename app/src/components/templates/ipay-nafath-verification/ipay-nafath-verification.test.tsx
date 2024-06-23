import { render } from '@testing-library/react-native';
import IPayNafathVerification from './ipay-nafath-verification.component';

// Mock dependencies
jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    colors: {
      primary: { primary800: '' },
      natural: { natural0: '' },
      greyPalette: {greyOverlay: ''},
    },
    icons: {
      externalLink: jest.fn().mockReturnValue('ExternalLink'), // Mock icons as needed
      infoIcon: jest.fn().mockReturnValue('InfoIcon'),
      arrowRight: jest.fn().mockReturnValue('ArrowRight'),
    }
  })
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    enter_received_code: 'Enter the received code:', // Mock localization text as needed
    enter_four_digit_otp: 'Enter the four-digit OTP for:', // Mock more localization text if needed
    code_expires_in: 'Code expires in', // Mock more localization text if needed
    send_code_again: 'Send code again', // Mock more localization text if needed
    confirm: 'Confirm' // Mock more localization text if needed
  })
}));

describe('IPayNafathVerification', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<IPayNafathVerification testID="nafath-verification" />);
    const container = getByTestId('nafath-verification-base-view');
    expect(container).toBeTruthy();
  });
});

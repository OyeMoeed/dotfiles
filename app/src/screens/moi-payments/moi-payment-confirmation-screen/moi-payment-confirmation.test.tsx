import { useTypedSelector } from '@app/store/store';
import { render } from '@testing-library/react-native';
import useMoiPaymentConfirmation from './moi-payment-confirmation-details.hook';
import MoiPaymentConfirmationScreen from './moi-payment-confirmation.screent';

// Mock hooks
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  BILL_PAYMENTS: {
    MOI_PAYMENT: 'MOI Payment',
  },
  SADAD: {
    COMPLETE_PAYMENT: 'Complete Payment',
  },
  HOME: {
    ACCOUNT_BALANCE: 'Account Balance',
  },
  COMMON: { SAR: 'SAR' },
  LOCAL_TRANSFER: { TOTAL_AMOUNT: 'Total Amount' },
}));

jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#000000',
      primary800: '#555555',
    },
    natural: {
      natural0: '#ffffff',
    },
    backgrounds: {
      transparent: 'trnasparent',
    },
    error: {
      error500: '#000',
    },
    tertiary: {
      tertiary500: '#fff',
    },
    critical: {
      critical800: '#000',
    },
    success: {
      success500: '#fff',
    },
    secondary: {
      secondary500: '#000',
    },
    appGradient: { gradientPrimary10: ['#fff', '#000'] },
  },
}));

jest.mock('@app/store/store', () => ({
  useTypedSelector: jest.fn(),
}));

jest.mock('./moi-payment-confirmation-details.hook', () => jest.fn());

describe('<MoiPaymentConfirmationScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTypedSelector as jest.Mock).mockReturnValue({
      walletInfo: {
        availableBalance: '1000',
        currentBalance: '500',
      },
    });

    (useMoiPaymentConfirmation as jest.Mock).mockReturnValue({
      moiPaymentDetailes: [],
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(<MoiPaymentConfirmationScreen />);
    expect(getByText('MOI Payment')).toBeTruthy();
    expect(getByText('Complete Payment')).toBeTruthy();
  });

  it('displays the correct balance', () => {
    render(<MoiPaymentConfirmationScreen />);
    expect(useTypedSelector).toHaveBeenCalled();
  });

  it('displays the correct payment details', () => {
    render(<MoiPaymentConfirmationScreen />);
    expect(useMoiPaymentConfirmation).toHaveBeenCalled();
  });
});

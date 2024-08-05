import { render } from '@testing-library/react-native';
import BillPaymentFailedScreen from './bill-payment-failed.screen';

// Mock the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    PAY_BILL: {
      PAYMENT_FAILED: 'Payment Failed',
      TRY_AGAIN_COMPLETE_PAYMENT: 'Please try again to complete the payment.',
      VIEW_EDIT_DETAILS: 'View/Edit Details',
    },
    COMMON: {
      HOME: 'Home',
    },
  }),
}));

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      error: { error500: '#FF0000' },
      primary: { primary800: '#0000FF', primary500: '#00FF00' },
      natural: { natural0: '#FFFFFF' },
    },
  }),
}));

describe('BillPaymentFailedScreen', () => {
  it('renders the component correctly', () => {
    const { getByText, getByTestId } = render(<BillPaymentFailedScreen />);

    expect(getByText('Payment Failed')).toBeTruthy();
    expect(getByText('Please try again to complete the payment.')).toBeTruthy();
    expect(getByText('View/Edit Details')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
  });
});

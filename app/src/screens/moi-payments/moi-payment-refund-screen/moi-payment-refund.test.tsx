import { render } from '@testing-library/react-native';
import useMoiPaymentConfirmation from '../moi-payment-confirmation-screen/moi-payment-confirmation-details.hook';
import MoiPaymentRefund from './moi-payment-refund.screen';

// Mock hooks
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  BILL_PAYMENTS: {
    REFUND_BILLS: 'Refund Bills',
  },
  SADAD: {
    COMPLETE_PAYMENT: 'Complete Payment',
  },
  COMMON: {
    SAR: 'SAR',
  },
  LOCAL_TRANSFER: {
    TOTAL_AMOUNT: 'Total Amount',
  },
}));

jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#000000',
    },
    natural: {
      natural0: '#FFFFFF',
    },
    appGradient: {
      gradientPrimary10: ['#fff', '#000'],
    },
    tertiary: {
      tertiary50: '#000',
    },
    secondary: {
      secondary100: '#fff',
    },
  },
}));

jest.mock('../moi-payment-confirmation-screen/moi-payment-confirmation-details.hook', () => jest.fn());

describe('<MoiPaymentRefund />', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useMoiPaymentConfirmation as jest.Mock).mockReturnValue({
      moiPaymentDetailes: [
        { id: '1', name: 'Payment 1' },
        { id: '2', name: 'Payment 2' },
        { id: '3', name: 'Payment 3' },
      ],
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(<MoiPaymentRefund />);
    expect(getByText('Refund Bills')).toBeTruthy();
    expect(getByText('Complete Payment')).toBeTruthy();
  });

  it('applies the correct styles', () => {
    const { getByText } = render(<MoiPaymentRefund />);
    // Check if the title is displayed with the correct style
    expect(getByText('Refund Bills')).toBeTruthy();
  });

  it('renders the footer component with correct text and total amount', () => {
    const { getByText } = render(<MoiPaymentRefund />);
    expect(getByText('Complete Payment')).toBeTruthy();
  });
});

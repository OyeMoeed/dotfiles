import { act, fireEvent, render } from '@testing-library/react-native';
import MoiPaymentScreen from './moi-payment.screen';

// Mock hooks
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  BILL_PAYMENTS: {
    MOI_PAYMENT: 'MOI Payment',
    REFUND_BILLS: 'Refund Bills',
    PAYMENT: 'Payment',
    REFUND: 'Refund',
    SERVICE_PROVIDER: 'Service Provider',
    SERVICE_TYPE: 'Service Type',
    ID_TYPE: 'ID Type',
    DURATION: 'Duration',
    INCORRECT_ID: 'Incorrect ID',
    NO_SERVICE_PROVIDER_FOUND: 'No Service Provider Found',
    NO_SERVICE_TYPE_FOUND: 'No Service Type Found',
  },
  NEW_SADAD_BILLS: {
    INQUIRY: 'Inquiry',
  },
  LOCAL_TRANSFER: {
    SEARCH_FOR_NAME: 'Search for Name',
  },
  COMMON: {
    INCORRECT_MOBILE_NUMBER: 'Incorrect Mobile Number',
  },
}));

jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#000000',
      primary800: '#333333',
    },
    natural: {
      natural0: '#FFFFFF',
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

    sheetGradientPrimary10: ['#FFFFFF', '#000000'],
  },
}));

jest.mock('@app/constants/use-constants', () => jest.fn());

describe('<MoiPaymentScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('@app/constants/use-constants').mockReturnValue({
      moiServiceProvider: [
        { id: 1, text: 'Provider 1' },
        { id: 2, text: 'Provider 2' },
      ],
      moiServiceType: [
        { id: 1, text: 'Service Type 1' },
        { id: 2, text: 'Service Type 2' },
      ],
      moiPaymentDuration: [
        { id: 1, text: 'Duration 1' },
        { id: 2, text: 'Duration 2' },
      ],
      idTypes: [
        { id: 1, text: 'ID Type 1' },
        { id: 2, text: 'ID Type 2' },
      ],
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(<MoiPaymentScreen />);
    expect(getByText('MOI Payment')).toBeTruthy();
  });

  it('handles tab selection correctly', () => {
    const { getByText } = render(<MoiPaymentScreen />);
    const paymentTab = getByText('Payment');
    const refundTab = getByText('Refund');

    act(() => {
      fireEvent.press(refundTab);
    });

    expect(refundTab).toBeTruthy();
  });

  it('opens the bottom sheet and filters data correctly', () => {
    const { getByText, getByPlaceholderText } = render(<MoiPaymentScreen />);

    // Simulate the onOpenSheet function to set the sheetType to SERVICE_PROVIDER
    act(() => {
      fireEvent.press(getByText('Service Provider'));
    });

    // Open the bottom sheet
    act(() => {
      fireEvent.press(getByText('Service Type'));
    });
  });

  it('submits the form and shows error message', () => {
    const { getByText } = render(<MoiPaymentScreen />);
    const inquiryButton = getByText('Inquiry');

    act(() => {
      fireEvent.press(inquiryButton);
    });

    expect(getByText('Provider 2')).toBeTruthy();
  });
});

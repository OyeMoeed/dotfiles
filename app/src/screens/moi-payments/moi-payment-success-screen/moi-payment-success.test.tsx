import icons from '@app/assets/icons';
import { ToastProvider } from '@app/components/molecules/ipay-toast/context/ipay-toast-context'; // Import ToastProvider
import { act, fireEvent, render } from '@testing-library/react-native';
import MoiPaymentSuccess from './moi-payment-success.screen';

// Mock hooks
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  BILL_PAYMENTS: {
    PAYMENT_SUCCESS_MESSAGE: 'Payment Successful!',
    PAY_ANOTHER_BILL: 'Pay Another Bill',
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
  TOP_UP: {
    REF_NUMBER_COPIED: 'Reference Number Copied',
    SHARE: 'Share',
  },
  NEW_SADAD_BILLS: {
    INQUIRY: 'Inquiry',
  },
  LOCAL_TRANSFER: {
    SEARCH_FOR_NAME: 'Search for Name',
  },
  COMMON: {
    INCORRECT_MOBILE_NUMBER: 'Incorrect Mobile Number',
    HOME: 'Home',
    SAR: 'SAR',
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
      natural900: '#000000',
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

const mockShowToast = jest.fn();

describe('<MoiPaymentSuccess />', () => {
  const route = {
    params: {
      moiPaymentDetailes: [
        { id: '1', label: 'Service', value: 'Utility Bill', icon: icons.bill },
        { id: '2', label: 'Amount', value: '500 SAR', icon: icons.money },
      ],
    },
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <ToastProvider>
        <MoiPaymentSuccess route={route} />
      </ToastProvider>,
    );
    expect(getByText('Pay Another Bill')).toBeTruthy();
  });

  it('handles share button press', () => {
    const { getByText } = render(
      <ToastProvider>
        <MoiPaymentSuccess route={route} />
      </ToastProvider>,
    );
    const shareButton = getByText('Share');

    act(() => {
      fireEvent.press(shareButton);
    });

    expect(shareButton).toBeTruthy();
  });

  it('filters and reorders payment details correctly', () => {
    const { getByText } = render(
      <ToastProvider>
        <MoiPaymentSuccess route={route} />
      </ToastProvider>,
    );
    expect(getByText('Ref. Number')).toBeTruthy();
    expect(getByText('FTA35346')).toBeTruthy();
  });
});

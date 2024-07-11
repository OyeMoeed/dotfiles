import { fireEvent, render } from '@testing-library/react-native';
import IPayCardDetails from './ipay-card-details.component';

// Mocking dependencies
jest.mock('@app/components/molecules/ipay-toast/context/ipay-toast-context', () => ({
  useToastContext: jest.fn(() => ({
    showToast: jest.fn(),
  })),
}));

jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false),
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    CARDS: {
      CARD_TYPE: 'Mock Card Type',
      CARD_NUMBER: 'Mock Card Number',
      CARD_HOLDER_NAME: 'Mock Card Holder',
      EXPIRY_DATE: 'Mock Expiry Date',
    },
    TOP_UP: {
      COPIED: 'Mock Copied Message',
    },
  }),
}));

// Mock copyText function from utilities
jest.mock('@app/utilities/clip-board.util', () => ({
  copyText: jest.fn(),
}));

describe('IPayCardDetails component', () => {
  it('renders card details correctly', () => {
    const { getByText } = render(<IPayCardDetails />);

    // Check if each card detail item is rendered
    expect(getByText('Mock Card Type')).toBeTruthy();
    expect(getByText('Mock Card Number')).toBeTruthy();
    expect(getByText('Mock Card Holder')).toBeTruthy();
    expect(getByText('Mock Expiry Date')).toBeTruthy();
  });

  it('copy button triggers copy action', () => {
    const { getByTestId } = render(<IPayCardDetails />);

    // Find and click the copy button for card number
    const copyButton = getByTestId('copy-button-base-view');
    fireEvent.press(copyButton);
  });
});

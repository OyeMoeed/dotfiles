// Import necessary libraries and utilities for testing
import { fireEvent, render } from '@testing-library/react-native';
import InternationalTransferInfoScreen from './international-transfer-info.screen'; // Adjust import path as needed

// Mock necessary dependencies or constants
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    TRANSFER: { TRANSFER_INFRORMATION: 'Transfer Information' },
    HOME: {
      ACCOUNT_BALANCE: 'Account Balance',
      REMAINING_AMOUNT: 'Remaining Amount',
      OF: 'of',
    },
    COMMON: {
      SAR: 'SAR',
      TOP_UP: 'Top Up',
      VIEW_DETAILS: 'View Details',
      INCLUDE_FEES: 'Include Fees',
      REASON_OF_TRANSFER: 'Reason of Transfer',
      NEXT: 'Next',
    },
    LOCAL_TRANSFER: {
      FEES: 'fees',
    },
  }),
}));

// Mock the hooks and constants
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#007700',
      primary800: '#005500',
    },
    secondary: {
      secondary50: '#e0e0e0',
      secondary500: 'yellow',
    },
    natural: {
      natural0: '#ffffff',
      natural700: 'brown',
    },
    backgrounds: {
      transparent: '#000',
    },
    error: {
      error500: '#fff',
    },
    tertiary: {
      tertiary500: 'red',
    },
    critical: { critical800: '#fff' },
    success: {
      success500: 'green',
    },
  },
}));

jest.mock('./international-transfer-info.constant', () => ({
  accountBalance: '$5000',
  remainingAmount: '$2500',
  totalAmount: '$5000',
  name: 'John Doe',
  country: 'Egypt',
  via: 'Bank Transfer',
  fee: '5',
  vat: '10',
  reasonOfTransfer: ['Family Support', 'Business Payment', 'Gift'],
}));

describe('InternationalTransferInfoScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<InternationalTransferInfoScreen />);

    // Assert that the title is rendered
    expect(getByText('Transfer Information')).toBeTruthy();

    // Assert that account balance information is rendered
    expect(getByText('$5000')).toBeTruthy();
    expect(getByText('SAR')).toBeTruthy();

    // Assert that the "Top Up" button is rendered
    expect(getByText('Top Up')).toBeTruthy();

    // Simulate clicking on the "Top Up" button (optional)
    fireEvent.press(getByText('Top Up'));
    // You can add more assertions based on the expected behavior after button press

    // Assert that the country and name are rendered
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Egypt')).toBeTruthy();

    // Assert that the "Next" button is initially disabled
    expect(getByText('Next')).toBeDefined();

    // Select a reason of transfer
    fireEvent.press(getByText('Family Support'));
  });
});

import { fireEvent, render } from '@testing-library/react-native';
import InternationalTransferHistory from './international-transfer-history.screen';

// Mock the hooks and constants
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#007700',
      primary800: '#005500',
    },
    secondary: {
      secondary50: '#e0e0e0',
    },
    natural: {
      natural0: '#ffffff',
    },
    backgrounds: {
      transparent: '#000',
    },
    error: {
      error500: '#fff',
    },
    tertiary: {
      tertiary500: '',
    },
  },
}));

jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  COMMON: {
    TRANSACTION_HISTORY: 'Transaction History',
  },
  TRANSACTION_HISTORY: {
    NO_RECORDS_TRANSACTIONS_HISTORY: 'No records found in transaction history.',
  },
}));

jest.mock('@app/constants/constants', () => ({
  TRANSACTION_FILTERS: ['All', 'Completed', 'Pending', 'Failed'],
}));

jest.mock('./international-transfer-history.data', () => [
  { id: 1, status: 'completed', amount: '100', date: '2023-07-20' },
  { id: 2, status: 'pending', amount: '200', date: '2023-07-21' },
]);

describe('InternationalTransferHistory', () => {
  it('renders correctly and displays transaction history', () => {
    const { getByText } = render(<InternationalTransferHistory />);

    expect(getByText('Transaction History')).toBeTruthy();
    expect(getByText('All')).toBeTruthy();
    expect(getByText('Completed')).toBeTruthy();
  });

  it('displays no records message when there are no transactions', () => {
    // Mock empty data
    jest.mock('./international-transfer-history.data', () => []);

    const { getByText } = render(<InternationalTransferHistory />);

    expect(getByText('No records found in transaction history.')).toBeTruthy();
  });

  it('filters transactions correctly when a filter tab is pressed', () => {
    const { getByText, queryByText } = render(<InternationalTransferHistory />);

    expect(getByText('Transaction History')).toBeTruthy();
    expect(getByText('Pending')).toBeTruthy();
    expect(getByText('Failed')).toBeTruthy();

    fireEvent.press(getByText('Completed'));
    fireEvent.press(getByText('All'));
  });
});

import useLocalization from '@app/localization/hooks/localization.hook';
import { render } from '@testing-library/react-native';
import TransactionHistoryScreen from './transaction-history.screen';

jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());

// Mocking molecules
jest.mock('@components/molecules', () => ({
  IPayGradientIcon: jest.fn(),
  IPayHeader: jest.fn((props) => <header>{props.children}</header>),
}));

jest.mock('./transaction-history.constant', () => ({
  __esModule: true,
  default: [
    {
      name: 'Ahmed Mohamed',
      transaction_type: 'send_money',
      type: 'credit',
      amount: '250',
      transaction_date: '14/03/2024 - 14:30',
      sender: 'Adam Ahmad',
      receiver: 'Ahmed Mohamed',
      transfer_reason: 'Living Expense',
      note: 'Hello Ahmed',
      ref_number: 'FTA35346',
    },
  ],
}));

jest.mock('./component/ipay-transaction.component', () => jest.fn());

// Mocking atoms
jest.mock('@components/atoms', () => ({
  IPayPressable: jest.fn(() => null),
  IPayIcon: jest.fn((props) => <view>{props.children}</view>),
  IPayLinearGradientView: jest.fn(({ children }) => <div>{children}</div>),
  IPayScrollView: jest.fn(({ children }) => <div>{children}</div>),
}));

// Mocking the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      appGradient: {
        gradientSecondary40: '#132131',
      },
      primary: {
        primary800: '#144667',
      },
      error: {
        error500: '#000000',
      },
      tertiary: {
        tertiary500: '#FFA500',
      },
      natural: {
        natural0: '#123456',
        natural100: '#124578',
        natural500: '#123321',
        natural900: '#123098',
      },
    },
  }),
}));

describe('IPayTransactionItem', () => {
  const mockLocalization = {
    transactions_history: 'Transaction History',
    send_money: 'Send Money',
  };

  beforeEach(() => {
    (useLocalization as jest.Mock).mockReturnValue(mockLocalization);
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<TransactionHistoryScreen />);

    const transactionItem = getByTestId('transaction-header');
    expect(transactionItem).toBeDefined();
  });

  it('renders localization correctly', () => {
    const { queryByText } = render(<TransactionHistoryScreen />);

    const transactionItem = queryByText(mockLocalization.transactions_history);
    expect(transactionItem).toBeDefined();
  });
});

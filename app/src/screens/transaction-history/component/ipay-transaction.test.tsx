import { transactionOperations, transactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { render } from '@testing-library/react-native';
import IPayTransactionItem from './ipay-transaction.component';

jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());

// Mocking the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
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
    sar: 'SAR',
    send_money: 'Send Money',
  };

  beforeEach(() => {
    (useLocalization as jest.Mock).mockReturnValue(mockLocalization);
  });
  let transaction = {
    transaction_type: transactionTypes.SEND_MONEY,
    type: transactionOperations.CREDIT,
    amount: '250',
  };

  it('renders correctly', () => {
    const { getByTestId } = render(<IPayTransactionItem transaction={transaction} testID="transaction" />);

    const transactionItem = getByTestId('transaction-pressable');
    expect(transactionItem).toBeDefined();
  });

  it('renders localization correctly according to transaction type', () => {
    const { getByText, queryByText } = render(<IPayTransactionItem transaction={transaction} testID="transaction" />);

    const transactionType = getByText(mockLocalization.send_money);
    expect(transactionType).toBeDefined();
    const currency = queryByText(mockLocalization.sar);
    expect(currency).toBeDefined();
  });

  it('renders flag correctly when local transfer', () => {
    transaction = {
      ...transaction,
      transaction_type: transactionTypes.LOCAL_TRANSFER,
    };
    const { getByTestId } = render(<IPayTransactionItem transaction={transaction} testID="transaction" />);

    const transactionItem = getByTestId('transaction-flag-icon');
    expect(transactionItem).toBeDefined();
  });
});

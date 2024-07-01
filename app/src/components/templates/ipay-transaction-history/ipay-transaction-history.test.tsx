import { transactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { render } from '@testing-library/react-native';
import IPayTransactionHistory from './ipay-transaction-history.component';

jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());

// Mocking molecules
jest.mock('@components/molecules', () => ({
  IPayGradientIcon: jest.fn(),
  IPayHeader: jest.fn((props) => <header>{props.children}</header>),
}));

jest.mock('@app/components/molecules', () => ({
  IPayButton: jest.fn((props) => (
    <button onClick={props.onPress} type="submit" data-variant={props.variant}>
      {props.btnText}
    </button>
  )),
}));

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
    amount: 'Amount',
    split_bill: 'Send Money',
    share: 'Share',
    vat_invoice: 'VAT invoice',
  };

  const transaction = {
    transaction_type: transactionTypes.SEND_MONEY,
    type: 'credit',
    amount: '250',
    transaction_date: '14/03/2024 - 14:30',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
  };

  beforeEach(() => {
    (useLocalization as jest.Mock).mockReturnValue(mockLocalization);
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<IPayTransactionHistory transaction={transaction} testID="transaction-history" />);
    const transactionItem = getByTestId('transaction-history-base-view');
    expect(transactionItem).toBeDefined();
  });

  it('renders localization correctly', () => {
    const { queryByText } = render(<IPayTransactionHistory transaction={transaction} />);
    const amount = queryByText(mockLocalization.amount);
    expect(amount).toBeDefined();
    const splitBill = queryByText(mockLocalization.share);
    expect(splitBill).toBeDefined();
  });

  it('renders transaction data correctly', () => {
    const { queryByText } = render(<IPayTransactionHistory transaction={transaction} />);
    expect(queryByText(transaction.transfer_reason)).toBeDefined();
    expect(queryByText(transaction.note)).toBeDefined();
  });

  it('renders correctly vat button when transaction type is local transfer', () => {
    const item = {
      ...transaction,
      transaction_type: transactionTypes.LOCAL_TRANSFER,
    };
    const { queryByText } = render(<IPayTransactionHistory transaction={item} testID="transaction-history" />);
    expect(queryByText(mockLocalization.share)).toBeDefined();
    expect(queryByText(mockLocalization.vat_invoice)).toBeDefined();
  });

  it('renders correctly split button when transaction type is POS purchase', () => {
    const item = {
      ...transaction,
      transaction_type: transactionTypes.POS_PURCHASE,
    };
    const { queryByText } = render(<IPayTransactionHistory transaction={item} testID="transaction-history" />);
    expect(queryByText(mockLocalization.share)).toBeDefined();
    expect(queryByText(mockLocalization.split_bill)).toBeDefined();
  });
});

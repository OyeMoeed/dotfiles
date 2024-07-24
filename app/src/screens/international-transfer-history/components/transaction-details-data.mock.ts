import { Countires, TransactionMedium, TransactionsStatus } from '@app/enums/transaction-types.enum';

const transactionMockData = {
  status: TransactionsStatus.REJECTED,
  transactionRequestType: 'International Transfer',
  transaction_medium: TransactionMedium.WESTERN_UNION,
  beneficiaryName: 'Adam Ahmed',
  country: Countires.PAKISTAN,
  iban: 'SA380019000500000000263180',
  bankName: 'HBL',
  phone_number: '+923000330099',
  transfer_reason: 'Living Expense',
  amount: '670',
  payrollAmount: '49793',
  exchangeRate: '12.69',
  includeFees: 'Yes',
  vatAmount: '10',
  bankFeesAmount: '10',
  promocode: 'Active',
  totalCreditAmount: '670',
  totalDebitAmount: '1200',
  ref_number: 'FTA35346',
  transactionDateTime: new Date('2024-07-01T12:00:00+05:00').toString(),
};

export default transactionMockData;

import {
  TransactionMedium,
  TransactionOperations,
  TransactionTypes,
  TransactionsStatus,
} from '@app/enums/transaction-types.enum';
import { IPayTransactionItemProps } from '../transaction-history/component/ipay-transaction.interface';

const internationalTransferHistoryData: IPayTransactionItemProps[] = [
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.CREDIT,
    country_flag: 'ur',
    amount: '670',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.PENDING,
    transaction_medium: TransactionMedium.WESTERN_UNION,
  },
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.CREDIT,
    country_flag: 'ur',
    amount: '670',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.REJECTED,
    transaction_medium: TransactionMedium.ALINMAPAY_DIRECT,
  },
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.CREDIT,
    country_flag: 'ur',
    amount: '670',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.PAID,
    transaction_medium: TransactionMedium.ALINMAPAY_DIRECT,
  },
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.DEBIT,
    country_flag: 'ur',
    amount: '1200',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.REFUND,
    transaction_medium: TransactionMedium.ALINMAPAY_DIRECT,
  },
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.CREDIT,
    country_flag: 'ur',
    amount: '670',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.PENDING,
    transaction_medium: TransactionMedium.ALINMAPAY_DIRECT,
  },
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.DEBIT,
    country_flag: 'ur',
    amount: '670',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.REFUND,
    transaction_medium: TransactionMedium.ALINMAPAY_DIRECT,
  },
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.CREDIT,
    country_flag: 'ur',
    amount: '670',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.REJECTED,
    transaction_medium: TransactionMedium.ALINMAPAY_DIRECT,
  },
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.CREDIT,
    country_flag: 'ur',
    amount: '900',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.REFUND,
    transaction_medium: TransactionMedium.WESTERN_UNION,
  },
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.CREDIT,
    country_flag: 'ur',
    amount: '1000',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.REFUND,
    transaction_medium: TransactionMedium.ALINMAPAY_DIRECT,
  },
  {
    name: 'Adel Sami',
    transaction_type: TransactionTypes.CASH_PICKUP,
    type: TransactionOperations.DEBIT,
    country_flag: 'ur',
    amount: '670',
    sender: 'Adam Ahmad',
    receiver: 'Ahmed Mohamed',
    transfer_reason: 'Living Expense',
    note: 'Hello Ahmed',
    ref_number: 'FTA35346',
    transaction_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    status: TransactionsStatus.REJECTED,
    transaction_medium: TransactionMedium.WESTERN_UNION,
  },
];

export default internationalTransferHistoryData;

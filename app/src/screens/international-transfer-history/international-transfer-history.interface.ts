import {
  Countires,
  TransactionMedium,
  TransactionOperations,
  TransactionsStatus,
  TransactionTypes,
} from '@app/enums/transaction-types.enum';

export interface InternationalTransferHistoryDataProps {
  status?: TransactionsStatus;
  transactionRequestType?: string;
  transactionMedium?: TransactionMedium;
  nickname?: string;
  transactionType?: TransactionTypes;
  type?: TransactionOperations;
  beneficiaryName?: string;
  country: Countires;
  iban?: string;
  bankName?: string;
  phoneNumber?: string;
  transferReason?: string;
  amount?: string;
  payrollAmount?: string;
  exchangeRate?: string;
  includeFees?: string;
  vatAmount?: string;
  bankFeesAmount?: string;
  promocode?: string;
  totalDebitAmount?: string;
  totalCreditAmount?: string;
  sender?: string;
  receiver?: string;
  note?: string;
  remittanceRefNumber?: string;
  transactionRefNumber?: string;
  transactionDateTime?: string;
}

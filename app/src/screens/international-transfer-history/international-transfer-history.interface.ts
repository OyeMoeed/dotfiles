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
  transaction_medium?: TransactionMedium;
  nickname?: string;
  transaction_type?: TransactionTypes;
  type?: TransactionOperations;
  beneficiaryName?: string;
  country: Countires;
  iban?: string;
  bankName?: string;
  phone_number?: string;
  transfer_reason?: string;
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
  ref_number?: string;
  transactionDateTime?: string;
}

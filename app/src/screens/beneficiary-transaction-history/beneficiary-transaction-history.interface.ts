import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';

/**
 * Props for the transaction object.
 */
interface BeneficiaryTransactionItemProps {
  name?: string;
  transactionRequestType: TransactionTypes.TRANSFER_SEND_MONEY | TransactionTypes.TRANSFER_RECEIVED_MONEY;
  transactionType: TransactionOperations.CREDIT | TransactionOperations.DEBIT;
  amount?: string;
  transfer_reason?: string;
  note?: string;
  ref_number?: string;
  fee?: string;
  vat?: string;
  bankName?: string;
  bankImage?: string;
  sender_nick_name?: string;
  beneficiary_nick_name?: string;
  transfer_by?: string;
  total_amount?: string;
  bank_account_no?: string;
}

interface TransactionType {
  Sent?: string;
  Received?: string;
}

export { BeneficiaryTransactionItemProps, TransactionType };

import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';

/**
 * Props for the transaction object.
 */
interface BeneficiaryTransactionItemProps {
  name?: string;
  transaction_type: TransactionTypes.SEND_MONEY | TransactionTypes.RECEIVED_MONEY;
  type: TransactionOperations.CREDIT | TransactionOperations.DEBIT;
  amount?: string;
  transaction_date?: string;
  sender?: string;
  receiver?: string;
  transfer_reason?: string;
  note?: string;
  ref_number?: string;
  card?: string;
  merchant_name?: string;
  fee?: string;
  vat?: string;
  acquire_country?: string;
  atm_location?: string;
  atm_transaction?: string;
  bank_name?: string;
  senders_iban?: string;
  receivers_iban?: string;
  bank_image?: string;
}

interface TransactionType {
  Sent?: string;
  Received?: string;
}

export { BeneficiaryTransactionItemProps, TransactionType };

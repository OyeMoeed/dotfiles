import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';

/**
 * Props for the transaction object.
 */
interface BeneficiaryTransactionItemProps {
  beneficiaryName?: string;
  transactionRequestType: TransactionTypes.PAY_WALLET | TransactionTypes.CIN_SARIE_REV;
  transactionType: TransactionOperations.CREDIT | TransactionOperations.DEBIT;
  amount?: string;
  transfer_reason?: string;
  note?: string;
  ref_number?: string;
  feesAmount?: string;
  vatAmount?: string;
  bankName?: string;
  bankImage?: string;
  sender_nick_name?: string;
  beneficiary_nick_name?: string;
  transfer_by?: string;
  total_amount?: string;
  bank_account_no?: string;
  transactionRequestTypeDesc?: string;
  transactionRefNumber?: string;
  transactionDateTime?: string;
}

interface TransactionType {
  Sent?: string;
  Received?: string;
}

export { BeneficiaryTransactionItemProps, TransactionType };

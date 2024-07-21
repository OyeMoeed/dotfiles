import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';
import { BeneficiaryTransactionItemProps } from '@app/screens/beneficiary-transaction-history/beneficiary-transaction-history.interface';

/**
 * Props for the transaction object.
 */
export interface IPayTransactionItemProps {
  name?: string;
  transaction_type:
    | TransactionTypes.SEND_MONEY
    | TransactionTypes.RECEIVED_MONEY
    | TransactionTypes.POS_PURCHASE
    | TransactionTypes.E_COMMERCE
    | TransactionTypes.CASHBACK
    | TransactionTypes.VISA_SIGNATURE_CARD_INSURANCE
    | TransactionTypes.ATM
    | TransactionTypes.LOCAL_TRANSFER
    | TransactionTypes.APPLE_PAY_TOP_UP;
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

/**
 * Props for the transaction item component.
 */
export interface IPayTransactionProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;

  /**
   * transaction object for the component to be rendered.
   */
  transaction: IPayTransactionItemProps;

  /**
   * Callback function called when the pressable is pressed.
   */
  onPressTransaction?: (transaction: IPayTransactionItemProps | BeneficiaryTransactionItemProps) => void;
  /**
   * to conditionally render on the basis of beneficiary history
   */
  isBeneficiaryHistory?: boolean;
}

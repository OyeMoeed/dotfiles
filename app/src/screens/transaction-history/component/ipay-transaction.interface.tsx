import { transactionOperations, transactionTypes } from '@app/enums/transaction-types.enum';

/**
 * Props for the transaction object.
 */
export interface IPayTransactionItemProps {
  name?: string;
  transaction_type:
    | transactionTypes.SEND_MONEY
    | transactionTypes.RECEIVED_MONEY
    | transactionTypes.POS_PURCHASE
    | transactionTypes.E_COMMERCE
    | transactionTypes.CASHBACK
    | transactionTypes.VISA_SIGNATURE_CARD_INSURANCE
    | transactionTypes.ATM
    | transactionTypes.LOCAL_TRANSFER
    | transactionTypes.APPLE_PAY_TOP_UP;
  type: transactionOperations.CREDIT | transactionOperations.DEBIT;
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
  atm_type?: string;
  bank_name?: string;
  senders_iban?: string;
  receivers_iban?: string;
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
  onPressTransaction?: (transaction: IPayTransactionItemProps) => void;
}

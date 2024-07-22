import {
  TransactionMedium,
  TransactionOperations,
  TransactionTypes,
  TransactionsStatus,
} from '@app/enums/transaction-types.enum';
import { StyleProp, ViewStyle } from 'react-native';

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
    | TransactionTypes.APPLE_PAY_TOP_UP
    | TransactionTypes.INTERNATIONAL_TRANSFER
    | TransactionTypes.CASH_PICKUP
    | TransactionTypes.BANK_TRANSFER;
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
  status?: TransactionsStatus;
  phone_number?: string;
  beneficiary?: string;
  bank_transfer?: string;
  country?: string;
  transaction_medium?: TransactionMedium;
  country_flag?: string;
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

  style?: StyleProp<ViewStyle>;

  /**
   * Callback function called when the pressable is pressed.
   */
  onPressTransaction?: (transaction: IPayTransactionItemProps) => void;
}

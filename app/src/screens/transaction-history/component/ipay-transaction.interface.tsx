import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';

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
}

export interface IPayTransactionItem {
  transactionRefNumber?: string;
  mtcn: any;
  remittanceRefNumber: any;
  amount: string;
  transactionRequestType: string;
  transactionRequestTypeDesc: string;
  transactionType:
    | TransactionTypes.SEND_MONEY
    | TransactionTypes.RECEIVED_MONEY
    | TransactionTypes.POS_PURCHASE
    | TransactionTypes.E_COMMERCE
    | TransactionTypes.CASHBACK
    | TransactionTypes.VISA_SIGNATURE_CARD_INSURANCE
    | TransactionTypes.ATM
    | TransactionTypes.LOCAL_TRANSFER
    | TransactionTypes.APPLE_PAY_TOP_UP
    | TransactionOperations.CREDIT
    | TransactionOperations.DEBIT
  mobileNumber?: string;
  walletNumber: any;
  nickname?: string;
  bankId: any;
  bankName: any;
  beneficiaryName: any;
  iban: any;
  terminalId: any;
  terminalDesc: any;
  cardNumber?: string;
  cardType: any;
  transactionDescription?: string;
  transactionDateTime: Date;
  walletTransactionStatus: string;
  feesAmount: string;
  vatAmount: string;
  bankFeesAmount: any;
  bankVatAmount: any;
  giftCategoryTitle: any;
  giftCategoryIconUrl: any;
  giftTemplateId: any;
  giftTemplateUrl: any;
  ftRefNumber: any;
  sadadPaymentRefNumber: any;
  vatInvoiceNumber: any;
  oneCardPriceBeforeVat: number;
  oneCardVat: number;
  oneCardPriceAfterVat: number;
  showVatInvoice: boolean;
  showSplitBill: boolean;
  payrollAmount: any;
  transactionJustfication: any;
  transactionDeductionDescription: any;
  fromMonth: any;
  toMonth: any;
  salaryMonth: any;
  senderName: string;
  bonusAmount: any;
  totalDebitAmount?: string;
  totalCreditAmount?: string;
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
  transaction: IPayTransactionItem;

  /**
   * Callback function called when the pressable is pressed.
   */
  onPressTransaction?: (transaction: IPayTransactionItem) => void;
}

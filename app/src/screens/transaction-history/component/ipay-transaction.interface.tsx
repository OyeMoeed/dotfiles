import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';
import { BeneficiaryTransactionItemProps } from '@app/screens/beneficiary-transaction-history/beneficiary-transaction-history.interface';

/**
 * Props for the transaction object.
 */
export interface IPayTransactionItemProps {
  beneficiaryName?: string;
  transactionRequestType:
    | TransactionTypes.SEND_MONEY
    | TransactionTypes.RECEIVED_MONEY
    | TransactionTypes.PAY_BILL
    | TransactionTypes.COUT_EXPRESS
    | TransactionTypes.CIN_CASH_BACK
    | TransactionTypes.VISA_SIGNATURE_CARD_INSURANCE
    | TransactionTypes.ATM
    | TransactionTypes.BKF_TRANSFER
    | TransactionTypes.APPLE_PAY_TOP_UP;
  transactionType: TransactionOperations.CREDIT | TransactionOperations.DEBIT;
  amount?: string;
  transactionDateTime?: string;
  sender?: string;
  receiver?: string;
  transfer_reason?: string;
  note?: string;
  transactionRefNumber?: string;
  card?: string;
  merchant_name?: string;
  feesAmount?: string;
  vatAmount?: string;
  acquire_country?: string;
  atm_location?: string;
  atm_transaction?: string;
  bank_name?: string;
  senders_iban?: string;
  receivers_iban?: string;
  bank_image?: string;
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
    | TransactionTypes.PAY_BILL
    | TransactionTypes.COUT_EXPRESS
    | TransactionTypes.CIN_CASH_BACK
    | TransactionTypes.VISA_SIGNATURE_CARD_INSURANCE
    | TransactionTypes.ATM
    | TransactionTypes.CIN_CASH_BACK
    | TransactionTypes.APPLE_PAY_TOP_UP
    | TransactionOperations.CREDIT
    | TransactionOperations.DEBIT;
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
  onPressTransaction?: (transaction: IPayTransactionItemProps | BeneficiaryTransactionItemProps) => void;
  /**
   * to conditionally render on the basis of beneficiary history
   */
  isBeneficiaryHistory?: boolean;
}

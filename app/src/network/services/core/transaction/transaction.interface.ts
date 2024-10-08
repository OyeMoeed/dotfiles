import { MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

interface WalletNumberProp {
  walletNumber: string;
}
// Define the TransactionItem interface
export interface TransactionItem {
  feesAmount: string;
  oneCardPriceAfterVat: number;
  showVatInvoice: boolean;
  walletTransactionStatus: string;
  sadadPaymentRefNumber: string | null;
  mobileNumber: string | null;
  oneCardPriceBeforeVat: number;
  payrollAmount: string | null;
  transactionJustfication: string | null;
  bankName: string | null;
  transactionDescription: string | null;
  terminalId: string | null;
  giftTemplateUrl: string | null;
  senderName: string | null;
  showSplitBill: boolean;
  beneficiaryName: string | null;
  bonusAmount: string | null;
  nickname: string | null;
  transactionDeductionDescription: string | null;
  remittanceRefNumber: string | null;
  walletNumber: string | null;
  terminalDesc: string | null;
  giftCategoryTitle: string | null;
  oneCardVat: number;
  mtcn: string | null;
  vatInvoiceNumber: string | null;
  amount: string;
  salaryMonth: string | null;
  transactionDateTime: string;
  transactionRequestType: string;
  cardType: string | null;
  toMonth: string | null;
  transactionRefNumber: string;
  giftTemplateId: string | null;
  ftRefNumber: string | null;
  vatAmount: string;
  bankFeesAmount: string | null;
  transactionRequestTypeDesc: string;
  transactionType: string;
  bankId: string | null;
  bankVatAmount: string | null;
  iban: string | null;
  giftCategoryIconUrl: string | null;
  fromMonth: string | null;
  cardNumber: string | null;
}

// Define the TransactionsResponseDetails interface that extends MockAPIDataProps with a specific response
interface TransactionsResponseDetails extends MockAPIDataProps {
  data: {
    transactions: TransactionItem[];
  };
  paginationInfo: {
    matchedRecords: string;
    sentRecords: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the TransactionsMockProps interface from TransactionsResponseDetails and MockAPIOkProp
interface TransactionsMockProps extends MockAPIOkProp {
  response: TransactionsResponseDetails['data']; // Reference 'data' directly without nesting again
  paginationInfo: TransactionsResponseDetails['paginationInfo']; // Include paginationInfo directly
  successfulResponse: TransactionsResponseDetails['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

interface TransactionsProp {
  walletNumber?: string;
  maxRecords?: string;
  offset?: string;
  cardIndex?: string;
  fromDate?: string;
  toDate?: string;
  fromAmount?: string;
  toAmount?: string;
  trxCategory?: string;
  trxType?: 'DR' | 'CR';
  trxReqType?: string;
  targetWallet?: string;
  mobileNumber?: string;
  salaryType?: string;
}

interface FilterFormDataProp {
  dateTo?: string;
  dateFrom?: string;
  amountFrom?: string;
  amountTo?: string;
}

interface CardsProp {
  walletNumber?: string;
  hideSpinner?: boolean;
  hideError?: boolean;
}

interface resetPinCodeProp {
  walletNumber?: string;
  cardIndex?: string;
  body?: {
    cardPinCode?: string;
    otp?: string;
    otpRef?: string;
    deviceInfo?: any;
  };
}

interface getCardDetailsProp {
  walletNumber?: string;
  body?: {
    cardIndex?: string;
    otp?: string;
    otpRef?: string;
    deviceInfo?: any;
  };
}

interface renewCardProp {
  walletNumber?: string;
  body?: {
    cardIndex?: string;
    otp?: string;
    otpRef?: string;
    cardType?: string;
    physicalCard?: boolean;
    deviceInfo?: any;
  };
}

interface prepareShowDetailsProp {
  walletNumber?: string;
  body?: {
    cardIndex?: string;
    deviceInfo: any;
  };
}

interface prepareRenewCardProp {
  walletNumber?: string;
  body?: {
    deviceInfo: any;
  };
}

interface generateInvoiceProps {
  walletNumber?: string;
  trxId?: string;
  trxDate?: string;
}

interface changeStatusProp {
  walletNumber?: string;
  body?: {
    status?: string;
    cardIndex?: string;
    deviceInfo?: any;
  };
}

interface CardListItem {
  registrationId: string;
  cardBin: string;
  lastDigits: string;
  binCountry: string;
  expirationYear: string;
  expirationMonth: string;
  embossingName: string;
  cardBrand: string;
  createdAt: string;
  paymentGateway1: string;
  token: string;
}

interface CardListResponse {
  status: MockAPIStatusProps;
  response: {
    referenceNumber: string;
    transactionDate: string;
    cards: CardListItem;
  };
  successfulResponse: boolean;
}

enum CardStatus {
  ONLINE_PURCHASE_DISABLE = '0',
  ONLINE_PURCHASE_ENABLE = '100',
  DISABLE = '700',
}

interface CardResponseInterface {
  cardIndex: string;
  cardNumber: string;
  cardStatus: string;
  cardStatusDesc: string;
  cardTypeId: string;
  cardTypeDesc: string;
  cardClassId: string;
  cardClassDesc: string;
  expiryDate: string;
  maskedCardNumber: string;
  cvv2: string;
  linkedName: {
    title: string;
    embossingName: string;
    firstName: string;
    lastName: string;
  };
  issueDate: string;
  expiryDateMonthYear: string;
  creditCardDetails: {
    dueAmount: string;
    availableBalance: string;
    cashAvailableBalance: string;
    extraBalance: string;
    totalOutstanding: string;
    creditLimit: string;
    cashLimit: string;
    statementIssuanceDate: string;
    nextAnnualFeesDueDate: string;
    virtualCard: true;
  };
}

enum TransactionTrxReqType {
  MUSANED = 'COUT_MUSANED',
  GIFT = 'COUT_GIFT',
}

export {
  CardListItem,
  CardListResponse,
  CardsProp,
  FilterFormDataProp,
  TransactionsMockProps,
  TransactionsProp,
  WalletNumberProp,
  resetPinCodeProp,
  changeStatusProp,
  CardStatus,
  prepareShowDetailsProp,
  getCardDetailsProp,
  prepareRenewCardProp,
  renewCardProp,
  generateInvoiceProps,
  CardResponseInterface,
  TransactionTrxReqType,
};

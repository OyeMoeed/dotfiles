import { MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

interface WalletNumberProp {
  walletNumber: string;
}
// Define the TransactionItem interface
interface TransactionItem {
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
  data: TransactionsResponseDetails['data']; // Reference 'data' directly without nesting again
  paginationInfo: TransactionsResponseDetails['paginationInfo']; // Include paginationInfo directly
  successfulResponse: TransactionsResponseDetails['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

export { TransactionsMockProps, WalletNumberProp };

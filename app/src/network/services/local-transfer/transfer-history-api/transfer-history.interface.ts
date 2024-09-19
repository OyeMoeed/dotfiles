import { ApiError } from '../../services.interface';

interface BeneficiaryTransaction {
  transactionRefNumber: string;
  mtcn: string | null;
  remittanceRefNumber: string | null;
  amount: string;
  transactionRequestType: string;
  transactionRequestTypeDesc: string;
  transactionType: string;
  mobileNumber: string | null;
  walletNumber: string | null;
  nickname: string | null;
  bankId: string | null;
  bankName: string | null;
  beneficiaryName: string | null;
  iban: string | null;
  terminalId: string | null;
  terminalDesc: string | null;
  cardNumber: string | null;
  cardType: string | null;
  transactionDescription: string | null;
  transactionDateTime: string;
  walletTransactionStatus: string;
  feesAmount: string;
  vatAmount: string;
  bankFeesAmount: string | null;
  bankVatAmount: string | null;
  giftCategoryTitle: string | null;
  giftCategoryIconUrl: string | null;
  giftTemplateId: string | null;
  giftTemplateUrl: string | null;
  ftRefNumber: string | null;
  sadadPaymentRefNumber: string | null;
  vatInvoiceNumber: string | null;
  oneCardPriceBeforeVat: number;
  oneCardVat: number;
  oneCardPriceAfterVat: number;
  showVatInvoice: boolean;
  showSplitBill: boolean;
  payrollAmount: string | null;
  transactionJustfication: string | null;
  transactionDeductionDescription: string | null;
  fromMonth: string | null;
  toMonth: string | null;
  salaryMonth: string | null;
  senderName: string | null;
  bonusAmount: string | null;
  bankImage: string | null;
}

interface Response {
  transactions: BeneficiaryTransaction[];
}

interface Status {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

interface PaginationInfo {
  matchedRecords: string;
  sentRecords: string;
}

interface LocalTransferMockProps {
  response?: Response | undefined;
  status?: Status;
  paginationInfo?: PaginationInfo;
  successfulResponse?: boolean;
  ok?: boolean;
  error?: ApiError;
  apiResponseNotOk?: boolean;
}

interface LocalTransferReqParams {
  walletNumber?: string;
  fromDate?: string;
  toDate?: string;
  beneficiaryName?: string;
  trxReqType?: string;
  fromAmount?: string;
  toAmount?: string;
}

export { BeneficiaryTransaction, LocalTransferMockProps, LocalTransferReqParams };

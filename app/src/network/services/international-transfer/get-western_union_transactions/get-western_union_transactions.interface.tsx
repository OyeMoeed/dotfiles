import { MockAPIStatusProps } from '../../services.interface';

// Interface for the transaction object
interface WuTransaction {
  westernUnionReferenceNumber: string;
  fundTransferReferenceNumber: string;
  date: string;
  status: string;
  statusDesc: string;
  totalAmount: string;
  moneyTransferControlNumber: string;
  refundEnabled: boolean;
  updateEnabled: boolean;
  inquiryEnabled: boolean;
  beneficiaryName: string;
}

// Interface for the response object
interface WuResponse {
  fromDate: string;
  toDate: string;
  transactions: WuTransaction[];
}

// Main interface for the wuTransactionsResponse
export interface WuTransactionsResponse {
  status: MockAPIStatusProps;
  response: WuResponse;
  successfulResponse: boolean;
}

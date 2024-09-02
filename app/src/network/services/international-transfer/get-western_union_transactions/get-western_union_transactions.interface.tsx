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

// Interface for the status object
interface WuStatus {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

// Main interface for the wuTransactionsResponse
export interface WuTransactionsResponse {
  status: WuStatus;
  response: WuResponse;
  successfulResponse: boolean;
}

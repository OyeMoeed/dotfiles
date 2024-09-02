// Interface for the transaction object
interface AlinmaExpressTransaction {
  speedRemittanceReferenceNumber: string;
  fundTransferReferenceNumber: string;
  date: string;
  status: string;
  statusDesc: string;
  beneficiaryName: string;
  country: string;
  countryDesc: string;
  beneficiaryBank: string;
  beneficiaryBankDesc: string;
  type: string;
  typeDesc: string;
  amount: string;
  feeAmount: string;
  taxAmount: string;
  totalAmount: string;
  currencyCode: string;
  currencyDesc: string;
}

// Interface for the response object
interface AlinmaExpressResponse {
  fromDate: string;
  toDate: string;
  transactions: AlinmaExpressTransaction[];
}

// Interface for the status object
interface AlinmaExpressStatus {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

// Main interface for the alinmaExpressTransactionsResponse
export interface AlinmaExpressTransactionsResponse {
  status: AlinmaExpressStatus;
  response: AlinmaExpressResponse;
  successfulResponse: boolean;
}

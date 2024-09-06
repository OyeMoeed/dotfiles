import { MockAPIStatusProps } from "../../services.interface";

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

// Main interface for the alinmaExpressTransactionsResponse
export interface AlinmaExpressTransactionsResponse {
  status: MockAPIStatusProps;
  response: AlinmaExpressResponse;
  successfulResponse: boolean;
}

import { MockAPIStatusProps } from '@network/services/services.interface';

export interface RequestTransactionItem {
  referenceNumber: string;
  transactionDate: string;
  transctionRefNumber: string;
  transactionId: string;
  totalTansactionAmount: string;
  beneficiaryName: string;
}

export interface UpdateRejectRequestResponseTypes {
  status: MockAPIStatusProps;
  response: RequestTransactionItem;
  successfulResponse: boolean;
}

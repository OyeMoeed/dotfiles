// Import necessary interfaces if they exist in your project
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the PaymentInfoProps interface
interface PaymentInfoProps {
  amount: string | number;
  dueDateTime: string; // Assuming date is in 'dd-mm-yyyy' format
  billCycle: string;
  billId: string;
  billIdType: string;
  billNumOrBillingAcct: string;
  billerId: string;
  billerName: string;
  paymentMethod: string | null;
  paymenType: string | null;
  checkDigit: string | null;
  billDesc: string;
  serviceDescription: string | null;
  billStatusCode: string;
  billStatusDesc: string;
  svcType: string;
  billNickname?: string;
  billerIcon?: string;
  billAmount?: string;
}

// Define the PaginationInfoProps interface
interface PaginationInfoProps {
  matchedRecords: string;
  sentRecords: string;
}

// Define the SadadBillsByStatusResponse interface
interface SadadBillsByStatusResponse {
  paymentInfoList: PaymentInfoProps[];
}

// Define payload for Sadad bills API
interface GetSadadBillByStatusProps {
  walletNumber: string;
  billStatus: string;
  showloader?: boolean;
}

// Define the SadadBillsByStatusMockProps interface that extends MockAPIOkProp with a specific response
interface SadadBillsByStatusMockProps extends MockAPIOkProp {
  status: MockAPIStatusProps;
  paginationInfo: PaginationInfoProps;
  response: SadadBillsByStatusResponse;
  successfulResponse: boolean;
}

// Export the interface
export type { GetSadadBillByStatusProps, PaginationInfoProps, PaymentInfoProps, SadadBillsByStatusMockProps };

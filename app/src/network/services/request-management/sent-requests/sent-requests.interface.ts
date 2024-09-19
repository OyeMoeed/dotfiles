// Import necessary interfaces
import {
  DeviceInfoProps,
  MockAPIDataProps,
  MockAPIOkProp,
  MockAPIStatusProps,
} from '@network/services/services.interface';

interface WalletNumberProp {
  walletNumber: string;
  currentPage: number;
  pageSize?: number;
}

//* ******************GetAllRequests****************************//

// Define the GetRequestItem interface
interface RequestItem {
  transactionId: string;
  transactionState: string;
  transactionTime: string;
  targetWalletNumber: string;
  targetFullName: string;
  targetMobileNumber: string;
  targetAmount: string;
  transactionDescription: string;
  realTransactionRefNumber?: string;
  cancellation_date?: string;
  payment_date?: string;
  request_date?: string;
  rejection_date?: string;
  realTransactionAmount?: string | null;
  realTransactionTotalPaidAmount?: string | null;
  realTransactionNumberOfPaymentRequests?: string | null;
  targetProfileImage?: string | null;
}

// Define the GetAllRequestsDetails interface that extends MockAPIDataProps with a specific response
interface GetAllRequestsDetails extends MockAPIDataProps {
  response: {
    requests: RequestItem[]; // Define 'RetainedMessages' here
  };
  paginationInfo: {
    matchedRecords: string;
    sentRecords: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the GetAllRequestMockProps interface from GetRequestDetails and MockAPIOkProp
interface GetAllRequestsMockProps extends MockAPIOkProp {
  response: GetAllRequestsDetails['response']; // Adjust to directly reference 'data' without nesting it again
  paginationInfo: GetAllRequestsDetails['paginationInfo']; // Include paginationInfo directly
  successfulResponse: GetAllRequestsDetails['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

interface CreateMoneyRequestContactItemTypes {
  mobileNumber: string;
  amount: string;
  note: string;
  inContactList: boolean;
}

interface CreateMoneyRequestContactResponseItemTypes {
  mobileNumber: string;
  amount: string;
  note: string;
  walletNumber: string;
  status: string;
  statusDesc: string;
}

interface CreateMoneyRequestPayloadTypes {
  requests: CreateMoneyRequestContactItemTypes[];
  deviceInfo: DeviceInfoProps;
}

interface CreateMoneyRequestResponseTypes {
  status: MockAPIStatusProps;
  response: {
    moneyRequestsResult: CreateMoneyRequestContactResponseItemTypes[];
  };
  successfulResponse: boolean;
}

export { WalletNumberProp, GetAllRequestsMockProps, CreateMoneyRequestPayloadTypes, CreateMoneyRequestResponseTypes };

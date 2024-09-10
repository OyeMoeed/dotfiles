// Import necessary interfaces if they exist in your project
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the Biller interface
interface BillerProps {
  billerId: string;
  billerDesc: string;
  imageURL: string;
  billerCategory: string;
  billerCategoryDesc: string;
  categoryImageURL: string;
}

// Define the BillProps interface
interface BillProps {
  billIndex: string;
  biller: BillerProps;
  nickName: string;
  dueAmount: string;
  dueAmountCurrency: string;
  dueAmountCurrencyDesc: string;
  existInSADAD: boolean;
  billProfile: 'REGULAR' | 'IRREGULAR';
  billAccountNumber: string;
  active: boolean;
  dueDateTime: string; // ISO 8601 format
  billStatus: 'UNPAID' | 'PAID'; // Assuming these are the possible statuses
  billStatusDesc: string;
  servicePaymentType: string;
  billPaymentStatus: 'PENDING' | 'COMPLETED'; // Assuming these are the possible statuses
  billPaymentStatusDesc: string;
  payDueAmountByDefault: boolean;
}

// Define the SadadBillsResponse interface
interface SadadBillsResponse {
  bills: BillProps[];
  landingPageBillsCountAccurate: boolean;
}

// Define payload for Sadad bills API
interface GetSadadBillProps {
  filterType: string;
  billerId?: string;
  billIndex?: string;
  billStatus?: string;
  billPaymentStatus?: string;
  offset?: number;
  maxRecords?: number;
  showloader?: boolean;
}

// Define the SadadBillsMockProps interface that extends MockAPIOkProp with a specific response
interface SadadBillsMockProps extends MockAPIOkProp {
  status: MockAPIStatusProps;
  response: SadadBillsResponse;
  successfulResponse: boolean;
}

// Export the interface
export type { BillerProps, BillProps, GetSadadBillProps, SadadBillsMockProps };

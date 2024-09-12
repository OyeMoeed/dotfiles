// Import necessary interfaces if they exist in your project
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';
import { IDeveiceInfo } from '../../core/id-renewal/id-renewal.interface';

interface DeleteBillRequest {
  billNumOrBillingAcct: string;
  billId: string;
  billNickname: string;
  walletNumber: string;
  deviceInfo: IDeveiceInfo;
}

// Define the DeleteBillResponse interface
interface DeleteBillResponse {
  billStatus: string; // Expected values might be "Deleted", "Pending", etc.
}

// Define the DeleteBillMockProps interface that extends MockAPIOkProp with a specific response
interface DeleteBillMockProps extends MockAPIOkProp {
  status: MockAPIStatusProps;
  response: DeleteBillResponse;
  successfulResponse: boolean;
}

// Export the interface
export type { DeleteBillMockProps, DeleteBillRequest, DeleteBillResponse };

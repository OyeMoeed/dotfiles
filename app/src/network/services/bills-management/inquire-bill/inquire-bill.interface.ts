import { DeviceInfoProps, MockAPIStatusProps } from '@network/services/services.interface';

// Define the InquireBillResponse interface for the response object
interface InquireBillResponse {
  billPaymentStatus: string; // Status of the bill payment
  billPaymentStatusDesc: string; // Description of the status
  showAmountGroup: boolean; // Whether to show the amount group
  dueDate: string; // Due date of the bill (YYYY-MM-DD format)
  dueAmount: string; // The amount due for the bill
  amountHint: string; // A hint message regarding the amount
  minimumAmount: string; // Minimum payment amount allowed
  maximumAmount: string; // Maximum payment amount allowed
  availableAmountList: string[]; // List of available amounts for payment
  deductedAmount: string; // Amount that was deducted
}

// Define the InquireBillMockProps interface extending common mock response structure
interface InquireBillMockProps {
  status: MockAPIStatusProps;
  response: InquireBillResponse;
  successfulResponse: boolean;
  translation?: string;
}

interface InquireBillPayloadProps {
  billerId?: string;
  serviceId?: string;
  billAccountNumber?: string;
  deviceInfo?: DeviceInfoProps;
}

// Export the interface
export type { InquireBillMockProps, InquireBillPayloadProps, InquireBillResponse };

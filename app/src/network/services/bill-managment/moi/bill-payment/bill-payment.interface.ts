// Import necessary interfaces if they exist in your project
import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { DeviceInfoProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the MOIBillPaymentResponse interface
interface MOIBillPaymentResponse {
  payemntRefrenceInfo: string;
  totalAmount: string;
  refundId: string | null;
  refundState: string | null;
  refundRejectionReason: string | null;
  feeAmount: string | null;
  vatAmount: string | null;
  transactionId: string;
}

// Define the MOIBillPaymentMockProps interface that extends MockAPIOkProp with a specific response
interface MOIBillPaymentMockProps extends MockAPIOkProp {
  status: MockAPIStatusProps;
  response: MOIBillPaymentResponse;
  successfulResponse: boolean;
}

// Define the MOIBillPaymentPayloadProps interface that has all required parameters for API call
interface MOIBillPaymentPayloadProps {
  walletNumber: string; // e.g., "10587981"
  moiBillPaymentType?: string; // e.g., "PAYMENT"
  otp?: string; // e.g., "1234"
  otpRef?: string; // e.g., "OTP2335924H0K"
  billerId?: string; // e.g., "002"
  billNumOrBillingAcct?: string; // e.g., "002245820000"
  dueDateTime?: string; // e.g., "24-11-2014"
  billIdType?: string; // e.g., "0"
  billingCycle?: string; // e.g., "002_2019"
  serviceDescription?: string; // e.g., "ELCT"
  deviceInfo?: DeviceInfoProps; // Nested object containing device information
  amount?: string; // e.g., "100.0"
  applyTax?: string; // e.g., "N"
  serviceId?: string; // e.g., "002"
  groupPaymentId?: string; // e.g., "10694728"
  paymentId?: string; // e.g., "3000612224"
  dynamicFields?: DynamicField[]; // Array of dynamic fields
}

// Export the interface
export type { MOIBillPaymentMockProps, MOIBillPaymentPayloadProps, MOIBillPaymentResponse };

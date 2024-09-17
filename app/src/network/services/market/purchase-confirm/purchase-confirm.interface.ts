// Import necessary interfaces
import { DeviceInfoProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the Status interface
interface PurchaseConfirmStatus extends MockAPIStatusProps {
  code: string;
  type: 'SUCCESS' | 'FAILURE'; // Assuming it could be 'SUCCESS' or 'FAILURE'
  desc: string;
  sessionReference: string;
  requestReference: string;
}

// Define the Response interface
interface PurchaseConfirmResponse {
  referenceNumber: string;
  serialNum: string;
  voucherPin: string;
}

// Define the PurchaseConfirmPayloadProps interface for payload props
interface PurchaseConfirmPayloadProps {
  productId?: string;
  merchant?: string;
  otpRef?: string;
  otp?: string;
  deviceInfo?: DeviceInfoProps;
}

// Define the PurchaseConfirmMockProps interface that extends MockAPIOkProp with a specific response
interface PurchaseConfirmMockProps extends MockAPIOkProp {
  status: PurchaseConfirmStatus;
  response: PurchaseConfirmResponse;
  successfulResponse: boolean;
}

// Export the interface
export { PurchaseConfirmMockProps, PurchaseConfirmPayloadProps };

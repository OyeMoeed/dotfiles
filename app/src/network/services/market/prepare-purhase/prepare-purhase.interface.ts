// Import necessary interfaces
import { DeviceInfoProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the Status interface
interface PreparePurchaseStatus extends MockAPIStatusProps {
  code: string;
  type: 'SUCCESS' | 'FAILURE'; // Assuming it could be 'SUCCESS' or 'FAILURE'
  desc: string;
  sessionReference: string;
  requestReference: string;
}

// Define the Response interface
interface PreparePurchaseResponse {
  otpRef: string;
}

// Define the PreparePurchasePayloadProps interface for payload props
interface PreparePurchasePayloadProps {
  productId?: string;
  deviceInfo?: DeviceInfoProps;
  showLoader?: boolean;
}

// Define the PreparePurchaseMockProps interface that extends MockAPIOkProp with a specific response
interface PreparePurchaseMockProps extends MockAPIOkProp {
  status: PreparePurchaseStatus;
  response: PreparePurchaseResponse;
  successfulResponse: boolean;
}

// Export the interface
export { PreparePurchaseMockProps, PreparePurchasePayloadProps };

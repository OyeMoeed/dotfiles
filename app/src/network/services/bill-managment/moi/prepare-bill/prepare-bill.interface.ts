// Import necessary interfaces if they exist in your project
import { DeviceInfoProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the PrepareBillResponse interface
interface PrepareBillResponse {
  otpRef: string;
}

// Define the PrepareBillMockProps interface that extends MockAPIOkProp with a specific response
interface PrepareBillMockProps extends MockAPIOkProp {
  status: MockAPIStatusProps;
  response: PrepareBillResponse;
  successfulResponse: boolean;
}

// Define the PrepareBillPayloadProps interface that has parmas required in payload
interface PrepareBillPayloadProps {
  deviceInfo?: DeviceInfoProps;
  walletNumber?: string;
  showLoader?: boolean;
}

// Export the interface
export type { PrepareBillMockProps, PrepareBillPayloadProps, PrepareBillResponse };

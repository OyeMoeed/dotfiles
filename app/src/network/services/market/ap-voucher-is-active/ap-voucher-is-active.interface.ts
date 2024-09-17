// Import necessary interfaces
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the Status interface
interface ApVoucherStatus extends MockAPIStatusProps {
  code: string;
  type: 'SUCCESS' | 'FAILURE'; // Assuming it could be 'SUCCESS' or 'FAILURE'
  desc: string;
  sessionReference: string;
  requestReference: string;
}

// Define the Response interface
interface ApVoucherResponse {
  isActive: boolean;
}

// Define the ApVoucherIsActiveProps interface that extends MockAPIOkProp with a specific response
interface ApVoucherIsActiveProps extends MockAPIOkProp {
  status: ApVoucherStatus;
  response: ApVoucherResponse;
  successfulResponse: boolean;
}

// Export the interface
export default ApVoucherIsActiveProps;

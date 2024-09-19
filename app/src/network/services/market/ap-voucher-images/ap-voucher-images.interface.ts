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
interface ApVoucherImagesResponse {
  images: string[]; // Array of image URLs as strings
}

// Define the ApVoucherImagesProps interface that extends MockAPIOkProp with a specific response
interface ApVoucherImagesProps extends MockAPIOkProp {
  status: ApVoucherStatus;
  response: ApVoucherImagesResponse;
  successfulResponse: boolean;
}

// Export the interface
export default ApVoucherImagesProps;

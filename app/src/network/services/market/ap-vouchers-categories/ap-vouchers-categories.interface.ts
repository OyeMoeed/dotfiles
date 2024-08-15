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

// Define the Category interface
interface ApVoucherCategory {
  code: string;
  desc: string;
  addtionalAttribute1: string; // Assuming this is an additional attribute specific to the category
}

// Define the Response interface
interface ApVoucherCategoriesResponse {
  categories: ApVoucherCategory[]; // Array of categories
}

// Define the ApVoucherCategoriesProps interface that extends MockAPIOkProp with a specific response
interface ApVoucherCategoriesProps extends MockAPIOkProp {
  status: ApVoucherStatus;
  response: ApVoucherCategoriesResponse;
  successfulResponse: boolean;
}

// Export the interface
export default ApVoucherCategoriesProps;

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

// Define the Merchant interface
interface ApVoucherMerchant {
  code: string;
  desc: string;
  iconUrl: string;
  category: string;
  categoryDesc: string;
}

// Define the Response interface
interface ApVoucherMerchantsResponse {
  merchants: ApVoucherMerchant[]; // Array of merchants
}

// Define the ApVoucherMerchantsCategoryProps interface that extends MockAPIOkProp with a specific response
interface ApVoucherMerchantsCategoryProps extends MockAPIOkProp {
  status: ApVoucherStatus;
  response: ApVoucherMerchantsResponse;
  successfulResponse: boolean;
}

interface PayloadMerchantsCategoryProps {
  marchantId: number | string;
  showLoader?: boolean;
}

// Export the interface
export { ApVoucherMerchantsCategoryProps, PayloadMerchantsCategoryProps };

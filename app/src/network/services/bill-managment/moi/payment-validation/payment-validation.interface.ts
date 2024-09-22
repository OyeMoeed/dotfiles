// Import necessary interfaces if they exist in your project
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the PaymentValidationResponse interface
interface PaymentValidationResponse {
  beneficiaryName: string;
  previousUnusedBalance: string;
  totalFeeAmount: string;
  referenceNumber: string;
}

// Define the PaymentValidationMockProps interface that extends MockAPIOkProp with a specific response
interface PaymentValidationMockProps extends MockAPIOkProp {
  status: MockAPIStatusProps;
  response: PaymentValidationResponse;
  successfulResponse: boolean;
}

interface DynamicField {
  index: string;
  value: string;
}

// Define the PaymentValidationPayloadProps interface for payment validation API payload
interface PaymentValidationPayloadProps {
  accountNumber: string;
  walletNumber: string;
  amount: string;
  amountCurrency: string;
  dynamicFields: DynamicField[];
}

interface InlinePaymentValidationProps {
  billerId: string;
  serviceId: string;
  showLoader?: boolean;
}

// Export the interface
export type {
  InlinePaymentValidationProps,
  PaymentValidationMockProps,
  PaymentValidationPayloadProps,
  PaymentValidationResponse,
};

// Import necessary interfaces if they exist in your project
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the DynamicField interface
interface DynamicField {
  index: string;
  value: string;
  type: string;
  label: string;
  required: boolean;
  minWidth: number;
  maxWidth: number;
}

// Define the CustomerIdType interface
interface CustomerIdType {
  fieldIndex: string;
  value: string;
}

// Define the MoiDynamicFieldsResponse interface
interface MoiDynamicFieldsResponse {
  dynamicFields: DynamicField[];
  showbillNumbertHint: boolean;
  billNumberHint: string;
  billNumberLabel: string;
  customerIdType: CustomerIdType;
  minimumAmount: string;
  maximumAmount: string;
  amountLovList: number[];
}

// Define the MoiDynamicFieldsMockProps interface that extends MockAPIOkProp with a specific response
interface MoiDynamicFieldsMockProps extends MockAPIOkProp {
  status: MockAPIStatusProps;
  response: MoiDynamicFieldsResponse;
  successfulResponse: boolean;
}

// Define MoiDynamicFieldsPayloadProps interface that has paramters required in API call
interface MoiDynamicFieldsPayloadProps {
  billerId: string;
  serviceId: string;
  walletNumber: string;
  showLoader?: boolean;
}

// Export the interface
export type { CustomerIdType, DynamicField, MoiDynamicFieldsMockProps, MoiDynamicFieldsPayloadProps };

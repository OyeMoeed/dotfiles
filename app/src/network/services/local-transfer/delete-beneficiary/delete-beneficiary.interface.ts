// Import necessary interfaces
import { MockAPIDataProps, MockAPIStatusProps } from '@network/services/services.interface';

// Define the LocalTransferDeleteBeneficiary interface that extends MockAPIDataProps with a specific response
interface LocalTransferDeleteBeneficiary extends MockAPIDataProps {
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the LocalTransferDeleteBeneficiaryMockProps interface from LocalTransferDeleteBeneficiary and MockAPIOkProp
interface LocalTransferDeleteBeneficiaryMockProps {
  successfulResponse: LocalTransferDeleteBeneficiary['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

export default LocalTransferDeleteBeneficiaryMockProps;

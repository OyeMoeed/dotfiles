// Import necessary interfaces
import { MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the Item interface
interface LocalBank {
  code: string;
  desc: string;
}

// Define the LocalBeneficiaryMetaDetails interface that extends MockAPIDataProps with a specific response
interface LocalBeneficiaryMetaDetails extends MockAPIDataProps {
  data: {
    localBanks: LocalBank[];
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the LocalBeneficiaryMetaMockProps interface from LocalBeneficiaryMetaDetails and MockAPIOkProp
interface LocalBeneficiaryMetaMockProps extends MockAPIOkProp {
  data: LocalBeneficiaryMetaDetails['data']; // Reference 'data' directly without nesting again
  successfulResponse: LocalBeneficiaryMetaDetails['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

export default LocalBeneficiaryMetaMockProps;

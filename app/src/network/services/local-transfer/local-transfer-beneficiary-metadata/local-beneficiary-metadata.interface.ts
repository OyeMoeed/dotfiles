// Import necessary interfaces
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the Item interface
interface LocalBank {
  code: string;
  desc: string;
}

// Define the LocalBeneficiaryMetaDetails interface
interface LocalBeneficiaryMetaDetails {
  data: {
    localBanks: LocalBank[];
  };
  successfulResponse: boolean;
}

// Extend the LocalBeneficiaryMetaMockProps interface from LocalBeneficiaryMetaDetails and MockAPIOkProp
interface LocalBeneficiaryMetaMockProps extends MockAPIOkProp, LocalBeneficiaryMetaDetails {
  status: MockAPIStatusProps; // Include status directly
  apiResponseNotOk: boolean;
}

export default LocalBeneficiaryMetaMockProps;

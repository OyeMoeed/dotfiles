// Import necessary interfaces
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Beneficiary Bank Details
interface BeneficiaryBankDetail {
  bankCode: string;
  bankName: string;
  branchName: string;
  address: string | null;
  correspondingBankCode: string | null;
  city: string | null;
}

// Beneficiary Details interface
interface BeneficiaryDetails {
  beneficiaryCode: string;
  beneficiaryStatus: string;
  nickname?: string;
  fullName: string;
  beneficiaryAccountNumber: string;
  isIBAN: boolean;
  beneficiaryBankDetail: BeneficiaryBankDetail;
}

// Define the LocalTransferBeneficiariesDetails interface
interface LocalTransferBeneficiariesDetails {
  data: {
    beneficiaries: BeneficiaryDetails[];
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

interface PaginationInfo {
  matchedRecords: string;
  sentRecords: string;
}

// Extend the LocalTransferBeneficiariesMockProps interface from LocalTransferBeneficiariesDetails and MockAPIOkProp
interface LocalTransferBeneficiariesMockProps extends MockAPIOkProp, LocalTransferBeneficiariesDetails {
  paginationInfo: PaginationInfo; // Pagination
  apiResponseNotOk: boolean;
}

export default LocalTransferBeneficiariesMockProps;

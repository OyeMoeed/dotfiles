// Import necessary interfaces
import { ApiError, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Beneficiary Details interface
interface BeneficiaryDetailsRes {
  beneficiaryCode: string;
  beneficiaryStatus: string;
}

interface BeneficiaryBankDetail {
  bankCode: string;
  correspondingBankCode: string;
  bankName: string;
}

interface DynamicField {
  index: string;
  value: string;
}

interface BeneficiaryInfo {
  beneficiaryBankDetail: BeneficiaryBankDetail;
  countryCode: string;
  nickname?: string;
  fullName: string;
  beneficiaryAccountNumber: string;
  dynamicFields?: DynamicField[];
  currency: string;
  remittanceType?: string;
}

// Define the LocalTransferAddBeneficiary interface
interface LocalTransferAddBeneficiary {
  data: BeneficiaryDetailsRes;
  successfulResponse: boolean;
}
interface Response {
  beneficiaryCode: string;
  beneficiaryStatus: string;
}

// Extend the LocalTransferAddBeneficiaryMockProps interface from LocalTransferAddBeneficiary and MockAPIOkProp
interface LocalTransferAddBeneficiaryMockProps extends MockAPIOkProp, LocalTransferAddBeneficiary {
  status: MockAPIStatusProps; // Include status directly
  error?: ApiError;
  response: Response;
  successfulResponse: boolean;
}

export { BeneficiaryDetailsRes, BeneficiaryInfo, LocalTransferAddBeneficiaryMockProps };

// Import necessary interfaces
import { ApiError, MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

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
  dynamicFields: DynamicField[];
  currency: string;
  remittanceType: string;
}

// Define the LocalTransferAddBeneficiary interface that extends MockAPIDataProps with a specific response
interface LocalTransferAddBeneficiary extends MockAPIDataProps {
  data: BeneficiaryDetailsRes;
  successfulResponse: boolean;
}

// Extend the LocalTransferAddBeneficiaryMockProps interface from LocalTransferAddBeneficiary and MockAPIOkProp
interface LocalTransferAddBeneficiaryMockProps extends MockAPIOkProp {
  data: LocalTransferAddBeneficiary['data']; // Reference 'data' directly without nesting again
  successfulResponse: LocalTransferAddBeneficiary['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
  apiResponseNotOk: boolean;
  error?: ApiError;
}

export { BeneficiaryDetailsRes, BeneficiaryInfo, LocalTransferAddBeneficiaryMockProps };

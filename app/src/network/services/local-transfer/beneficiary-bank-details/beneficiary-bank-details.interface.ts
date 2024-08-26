// Import necessary interfaces
import { ApiError, MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Beneficiary Details interface
interface BeneficiaryBankDetailsRes {
  bankCode: string;
  correspondingBankCode: string;
  bankName: string;
  beneficiaryType: string;
}

// Define the LocalTransferBeneficiaryBankDetails interface that extends MockAPIDataProps with a specific response
interface LocalTransferBeneficiaryBankDetails extends MockAPIDataProps {
  data?: BeneficiaryBankDetailsRes; // TODO need to update
  successfulResponse: boolean;
}

interface BeneficiaryBankDetailsReq {
  iban: string;
  countryCode: string;
  bankCode: string;
  beneficiaryType: string;
}

// Extend the LocalTransferBeneficiaryBankMockProps interface from LocalTransferBeneficiaryBankDetails and MockAPIOkProp
interface LocalTransferBeneficiaryBankMockProps extends MockAPIOkProp {
  data?: LocalTransferBeneficiaryBankDetails['data']; // Reference 'data' directly without nesting again
  successfulResponse?: LocalTransferBeneficiaryBankDetails['successfulResponse']; // Include successfulResponse directly
  status?: MockAPIStatusProps; // Include status directly
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

export { BeneficiaryBankDetailsReq, BeneficiaryBankDetailsRes, LocalTransferBeneficiaryBankMockProps };

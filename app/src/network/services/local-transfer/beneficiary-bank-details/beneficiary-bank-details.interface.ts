// Import necessary interfaces
import { ApiError, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Beneficiary Details interface
interface BeneficiaryBankDetailsRes {
  bankCode: string;
  correspondingBankCode: string;
  bankName: string;
  beneficiaryType: string;
  bankLogo: string;
  beneficiaryAccountNo: string;
}

// Define the LocalTransferBeneficiaryBankDetails interface
interface LocalTransferBeneficiaryBankDetails {
  data?: BeneficiaryBankDetailsRes; // TODO need to update
  successfulResponse?: boolean;
}

interface BeneficiaryBankDetailsReq {
  iban: string;
  countryCode: string;
  bankCode?: string;
  beneficiaryType?: string;
}

// Extend the LocalTransferBeneficiaryBankMockProps interface from LocalTransferBeneficiaryBankDetails and MockAPIOkProp
interface LocalTransferBeneficiaryBankMockProps extends MockAPIOkProp, LocalTransferBeneficiaryBankDetails {
  status?: MockAPIStatusProps; // Include status directly
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

export { BeneficiaryBankDetailsReq, BeneficiaryBankDetailsRes, LocalTransferBeneficiaryBankMockProps };

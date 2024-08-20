// Import necessary interfaces
import { MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

interface DynamicField {
  fieldCode: string;
  fieldValue: string;
}

interface LocalTransferEditBeneficiaryReq {
  nickname: string;
}

interface BeneficiaryInfo {
  fullName: string;
  beneficiaryType: string;
  bankCode: string;
  branchCode: string;
  accountNumber: string;
  currencyCode: string;
  countryCode: string;
  cityCode: string;
  phoneNumber: string;
  email: string;
  remittanceType: string;
  dynamicFields: DynamicField[];
}

// Define the LocalTransferEditBeneficiary interface that extends MockAPIDataProps with a specific response
interface LocalTransferEditBeneficiary extends MockAPIDataProps {
  data: {
    response: BeneficiaryInfo;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the LocalTransferEditBeneficiaryMockProps interface from LocalTransferEditBeneficiary and MockAPIOkProp
interface LocalTransferEditBeneficiaryMockProps extends MockAPIOkProp {
  data: LocalTransferEditBeneficiary['data']; // Reference 'data' directly without nesting again
  successfulResponse: LocalTransferEditBeneficiary['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

export { BeneficiaryInfo, LocalTransferEditBeneficiaryMockProps, LocalTransferEditBeneficiaryReq };

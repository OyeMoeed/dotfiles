// Import necessary interfaces
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

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

// Define the LocalTransferEditBeneficiary interface
interface LocalTransferEditBeneficiary {
  data: {
    response: BeneficiaryInfo;
  };
  successfulResponse: boolean;
}

// Extend the LocalTransferEditBeneficiaryMockProps interface from LocalTransferEditBeneficiary and MockAPIOkProp
interface LocalTransferEditBeneficiaryMockProps extends MockAPIOkProp, LocalTransferEditBeneficiary {
  status: MockAPIStatusProps; // Include status directly
  apiResponseNotOk?: boolean;
}

export { BeneficiaryInfo, LocalTransferEditBeneficiaryMockProps, LocalTransferEditBeneficiaryReq };

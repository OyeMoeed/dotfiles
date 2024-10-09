import { ApiError, MockAPIStatusProps } from '../../services.interface';

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

interface AEAddBeneficiaryReq {
  beneficiaryBankDetail: BeneficiaryBankDetail;
  countryCode: string;
  nickname?: string;
  fullName: string;
  beneficiaryAccountNumber: string;
  dynamicFields: DynamicField[];
  currency: string;
  remittanceType: string;
}

interface AEAddBeneficiaryProps {
  status: MockAPIStatusProps;
  response: BeneficiaryDetailsRes;
  successfulResponse: boolean;
  ok: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

export { AEAddBeneficiaryProps, AEAddBeneficiaryReq, BeneficiaryDetailsRes };

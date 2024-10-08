import { MockAPIStatusProps } from '../../services.interface';

interface PaginationInfo {
  matchedRecords: string;
  sentRecords: string;
}

interface BeneficiaryBankDetail {
  bankCode: string;
  bankName: string;
  branchName: string;
  address: string | null;
  correspondingBankCode: string | null;
  city: string | null;
}

interface AlinmaExpressBeneficiary {
  beneficiaryCode: string;
  beneficiaryStatus: string;
  nickname?: string;
  fullName: string;
  beneficiaryAccountNumber?: string;
  isIBAN: boolean;
  beneficiaryBankDetail: BeneficiaryBankDetail;
  currency?: string;
  currencyDesc?: string;
  remittanceType?: string;
  countryDesc?: string;
  countryFlag?: string;
  remittanceTypeDesc?: string;
  countryCode?: string;
}

interface AlinmaExpressResponse {
  beneficiaries: AlinmaExpressBeneficiary[];
}

interface AlinmaExpressBeneficiariesProps {
  status: MockAPIStatusProps;
  paginationInfo: PaginationInfo;
  response: AlinmaExpressResponse;
  successfulResponse: boolean;
}

interface UseGetAlinmaExpressBeneficiary {
  onSuccess?: (data: AlinmaExpressResponse) => void;
}

export default AlinmaExpressBeneficiariesProps;
export { AlinmaExpressBeneficiary, UseGetAlinmaExpressBeneficiary, AlinmaExpressResponse };

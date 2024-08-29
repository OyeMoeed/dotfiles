import { MockAPIStatusProps } from '../../services.interface';

interface BankDetail {
  bankCode: string | null;
  bankName: string | null;
  branchName: string;
  address: string | null;
  correspondingBankCode: string | null;
  city: string | null;
}

interface Beneficiary {
  beneficiaryCode: string;
  beneficiaryStatus: string;
  nickname: string;
  fullName: string;
  countryCode: string;
  countryDesc: string;
  countryFlag: string;
  currency: string;
  currencyDesc: string;
  remittanceType: string;
  remittanceTypeDesc: string;
  beneficiaryAccountNumber?: string; // Optional, as not all beneficiaries have this
  isIBAN: boolean;
  beneficiaryBankDetail: BankDetail;
}

interface PaginationInfo {
  matchedRecords: string;
  sentRecords: string;
}

interface Response {
  beneficiaries: Beneficiary[];
}

interface WesternUnionBeneficiariesProps {
  status: MockAPIStatusProps;
  paginationInfo: PaginationInfo;
  response: Response;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
}

export default WesternUnionBeneficiariesProps;
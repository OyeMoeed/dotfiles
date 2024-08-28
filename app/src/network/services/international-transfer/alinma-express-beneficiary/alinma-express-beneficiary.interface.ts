interface Status {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

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

interface Beneficiary {
  beneficiaryCode: string;
  beneficiaryStatus: string;
  nickname?: string;
  fullName: string;
  beneficiaryAccountNumber: string;
  isIBAN: boolean;
  beneficiaryBankDetail: BeneficiaryBankDetail;
  countryDesc?: string;
  countryFlag?: string;
  remittanceTypeDesc?: string;
}

interface Response {
  beneficiaries: Beneficiary[];
}

interface AlinmaExpressBeneficiariesProps {
  status: Status;
  paginationInfo: PaginationInfo;
  response: Response;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
}

export default AlinmaExpressBeneficiariesProps;

interface BeneficiaryItem {
  testId?: string;
  name: string;
  bankName: string;
  bankLogo: string;
  accountNo: string;
  active: boolean;
}
// Beneficiary Bank Details
interface BeneficiaryBankDetail {
  bankCode: string;
  bankName: string;
  branchName: string;
  address: string | null;
  correspondingBankCode: string | null;
  city: string | null;
}

// Beneficiary Details interface
interface BeneficiaryDetails {
  beneficiaryCode: string;
  beneficiaryStatus: string;
  nickname?: string;
  fullName: string;
  beneficiaryAccountNumber: string;
  isIBAN: boolean;
  beneficiaryBankDetail: BeneficiaryBankDetail;
}

type FooterStatus = 'active' | 'inactive';

export { BeneficiaryDetails, BeneficiaryItem, FooterStatus };

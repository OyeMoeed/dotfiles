interface BeneficiaryItem {
  testId?: string;
  name: string;
  bankName: string;
  bankLogo: string;
  accountNo: string;
  active: boolean;
}

type FooterStatus = 'active' | 'inactive';

export { BeneficiaryItem, FooterStatus };

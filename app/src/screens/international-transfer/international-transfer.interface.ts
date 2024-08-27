// Define an interface for the beneficiaryItem

type ViewAllStatus = 'active' | 'inactive';
interface BeneficiaryDetailsProps {
  remittanceTypeDesc: string;
  countryFlag: string;
  countryDesc: string;
  beneficiaryStatus: string;
  fullName: string;
}
export { BeneficiaryDetailsProps, ViewAllStatus };

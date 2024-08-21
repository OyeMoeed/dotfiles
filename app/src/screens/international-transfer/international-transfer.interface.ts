import { InternationalBeneficiaryStatus } from '@app/enums/international-beneficiary-status.enum';

// Define an interface for the beneficiaryItem

type ViewAllStatus = 'active' | 'inactive';
interface BeneficiaryDetailsProps {
  name: string;
  countryName: string;
  countryFlag: string;
  transferType: string;
  status: InternationalBeneficiaryStatus; // Assuming InternationalBeneficiaryStatus is an enum;
  active: boolean;
  transferGateway: string;
}
export { BeneficiaryDetailsProps, ViewAllStatus };

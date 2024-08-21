import { InternationalBeneficiaryStatus } from '@app/enums/international-beneficiary-status.enum';

// Define an interface for the beneficiaryItem
interface beneficiaryItemProps {
  name: string;
  countryName: string;
  countryFlag: string;
  transferType: string;
  status: InternationalBeneficiaryStatus; // Assuming InternationalBeneficiaryStatus is an enum
}
export default beneficiaryItemProps;

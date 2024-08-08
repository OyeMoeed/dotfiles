import images from '@app/assets/images';
import { InternationalBeneficiaryStatus } from '@app/enums/international-beneficiary-status.enum';
import beneficiaryItemProps from './international-transfer.interface';

const defaultDummyBeneficiaryData: beneficiaryItemProps[] = [
  {
    name: 'Ahmed Mohamed',
    countryName: 'Egypt',
    countryFlag: images.egyFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
  },
  {
    name: 'Mohamed Nassar',
    countryName: 'Egypt',
    countryFlag: images.egyFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.INACTIVE,
  },
  {
    name: 'Faisal Nasef',
    countryName: 'Nepal',
    countryFlag: images.nepFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
  },
  {
    name: 'Adel Sami',
    countryName: 'Pakistan',
    countryFlag: images.pakFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
  },
];

export default defaultDummyBeneficiaryData;

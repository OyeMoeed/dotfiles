import images from '@app/assets/images';
import { InternationalBeneficiaryStatus, TransferGatewayType } from '@app/enums/international-beneficiary-status.enum';
import { beneficiaryItemProps } from './international-transfer.interface';

const internationalBeneficiaryData: beneficiaryItemProps[] = [
  {
    name: 'Ahmed Mohamed',
    countryName: 'Egypt',
    countryFlag: images.egyFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
    active: true,
    transferGateway: TransferGatewayType.ALINMA_DIRECT,
  },
  {
    name: 'Mohamed Nassar',
    countryName: 'Egypt',
    countryFlag: images.egyFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.INACTIVE,
    active: false,
    transferGateway: TransferGatewayType.ALINMA_DIRECT,
  },
  {
    name: 'Faisal Nasef',
    countryName: 'Nepal',
    countryFlag: images.nepFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
    active: true,
    transferGateway: TransferGatewayType.ALINMA_DIRECT,
  },
  {
    name: 'Adel Sami',
    countryName: 'Pakistan',
    countryFlag: images.pakFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
    active: true,
    transferGateway: TransferGatewayType.ALINMA_DIRECT,
  },
];
const westernUnionBeneficiaryData: beneficiaryItemProps[] = [
  {
    name: 'Ahmed Mohamed',
    countryName: 'Egypt',
    countryFlag: images.egyFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
    active: true,
    transferGateway: TransferGatewayType.WESTERN_UNION,
  },
  {
    name: 'Mohamed Nassar',
    countryName: 'Egypt',
    countryFlag: images.nepFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.INACTIVE,
    active: false,
    transferGateway: TransferGatewayType.WESTERN_UNION,
  },
  {
    name: 'Mohamed Nassar',
    countryName: 'Egypt',
    countryFlag: images.egyFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
    active: true,
    transferGateway: TransferGatewayType.WESTERN_UNION,
  },
  {
    name: 'Mohamed Nassar',
    countryName: 'Egypt',
    countryFlag: images.pakFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.INACTIVE,
    active: false,
    transferGateway: TransferGatewayType.WESTERN_UNION,
  },
  {
    name: 'Faisal Nasef',
    countryName: 'Nepal',
    countryFlag: images.nepFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
    active: true,
    transferGateway: TransferGatewayType.WESTERN_UNION,
  },
  {
    name: 'Adel Sami',
    countryName: 'Pakistan',
    countryFlag: images.pakFlag,
    transferType: 'Bank Transfer',
    status: InternationalBeneficiaryStatus.ACTIVE,
    active: true,
    transferGateway: TransferGatewayType.WESTERN_UNION,
  },
];
const tabOptions = [
  { text: TransferGatewayType.ALINMA_DIRECT, image: images.alinmaPayDirectLogo },
  { text: TransferGatewayType.WESTERN_UNION, image: images.westernUnionLogo },
];

export { internationalBeneficiaryData, tabOptions, westernUnionBeneficiaryData };

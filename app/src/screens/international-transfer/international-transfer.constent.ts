import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { InternationalBeneficiaryStatus, TransferGatewayType } from '@app/enums/international-beneficiary-status.enum';
import { BeneficiaryDetailsProps } from './international-transfer.interface';

const internationalBeneficiaryData: BeneficiaryDetailsProps[] = [
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
const westernUnionBeneficiaryData: BeneficiaryDetailsProps[] = [
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

const internationalTransferData = [
  { id: '1', label: 'beneficiary', value: 'Ahmed Mohamed' },
  { id: '2', label: 'country', value: 'Egypt', image: images.egyFlag },
  { id: '3', label: 'transactionId', value: '21523325', icon: icons.copy },
  { id: '4', label: 'bankTransfer', value: 'AlinmaPay Direct' },
  { id: '5', label: 'iban', value: 'SA380019000500000000263180' },
  { id: '6', label: 'bankName', value: 'FAB1 Misr' },
  { id: '7', label: 'phoneNumber', value: '+20 01178598745' },
  { id: '8', label: 'reasonOfTransfer', value: 'Family and friends' },
  { id: '9', label: 'amountTo', value: '50 SAR' },
  { id: '10', label: 'amountFrom', value: '634.51 EGP' },
  { id: '11', label: 'exchangeRate', value: '12.69' },
  { id: '12', label: 'vat', value: '10 SAR' },
  { id: '13', label: 'fees', value: '10 SAR' },
  { id: '14', label: 'totalAmount', value: '50 SAR' },
];

const internationalTransferBeneficiaryDetails = {
  beneficiaryInfo: [
    { id: '1', label: 'beneficiaryNickName', value: 'Mohamed' },
    { id: '2', label: 'beneficiaryFullName', value: 'Ahmed Mohamed' },
    { id: '3', label: 'relationship', value: 'Friend' },
    { id: '4', label: 'countryName', value: 'Egypt', image: images.egyFlag },
    { id: '5', label: 'cityName', value: 'Alexandria' },
  ],
  beneficiaryDetails: [
    { id: '1', label: 'deliveryType', value: 'Bank Transfer' },
    { id: '2', label: 'iban', value: 'SA380019000500000000263180' },
    { id: '3', label: 'bankName', value: 'Alahli Bank' },
    { id: '4', label: 'currency', value: 'EGP' },
  ],
};

export {
  internationalBeneficiaryData,
  internationalTransferBeneficiaryDetails,
  internationalTransferData,
  tabOptions,
  westernUnionBeneficiaryData,
};

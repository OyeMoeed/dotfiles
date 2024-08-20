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

export { defaultDummyBeneficiaryData, internationalTransferData };

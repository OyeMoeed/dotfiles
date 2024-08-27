import images from '@app/assets/images';

const beneficiaryDummyData = {
  accountBalance: '5,200.40',
  remainingAmount: '5200',
  totalAmount: '10,000',
  defaultAmount: '0',
  fee: '15 SAR',
  vat: '4.00 SAR',
  egp: 'EGP',
  beneficiaryName: 'Ahmed Mohamed',
  beneficiaryCountry: 'Egypt',
  beneficiaryType: 'Bank Transfer',
  beneficiaryCurrencyFlag: images.egyFlag,
  reasonOfTransfer: [
    'Investment',
    'Tuition Expenses',
    'Treatment',
    'Travel Expenses',
    'Purchases',
    'Friends and Family Expenses',
    'Donations',
  ],
};
export default beneficiaryDummyData;

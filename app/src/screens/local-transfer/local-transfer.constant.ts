import images from '@app/assets/images';

// TODO will be handle on the basis of api
export const dummyBeneficiaryData = [
  {
    name: 'Floyd Miles',
    bankLogo: images.nationalBankLogo,
    bankName: 'Saudi National Bank',
    accountNo: 'SA38001900050000000026',
  },
  {
    name: 'Adel Sami',
    bankLogo: images.alinmaBankLogo,
    bankName: 'Alinma Bank',
    accountNo: 'SA38001900050000000026',
  },
  {
    name: 'Kristin Watson',
    bankLogo: images.rajhiBankLogo,
    bankName: 'Al Rajhi Bank',
    accountNo: 'SA38001900050000000026',
  },
];

export { dummyBeneficiaryData as defaultDummyBeneficiaryData };

import { ApVoucherMerchantsCategoryProps } from './get-products-by-category-id.interface';

const apVoucherMarchantsCategory: ApVoucherMerchantsCategoryProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCedb9b22031ed46cdaa02fa6a7459313b',
    requestReference: '01009971995759254412',
  },
  response: {
    merchants: [
      {
        code: '987553',
        desc: 'Adrenaline',
        iconUrl: 'https://www.alinma.com/ADS/evoucher/Merchant_Logos/987553.png',
        category: '7',
        categoryDesc: 'Online Games',
      },
      {
        code: '2075902',
        desc: 'Apex Legends Global',
        iconUrl: 'https://www.alinma.com/ADS/evoucher/Merchant_Logos/2075902.png',
        category: '7',
        categoryDesc: 'Online Games',
      },
      {
        code: '1141221',
        desc: 'Arafiesta',
        iconUrl: 'https://www.alinma.com/ADS/evoucher/Merchant_Logos/1141221.png',
        category: '7',
        categoryDesc: 'Online Games',
      },
    ],
  },
  successfulResponse: true,
};

export default apVoucherMarchantsCategory;

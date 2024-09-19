import ApVoucherImagesProps from './ap-voucher-images.interface';

const apVoucherImages: ApVoucherImagesProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC6c39d55938df4c0aac74b3a0e3c4c171',
    requestReference: '01009971995759254412',
  },
  response: {
    images: [
      'https://sitecoreuat.alinma.internal/ADS/remittance-en.png',
      'https://sitecoreuat.alinma.internal/ADS/hunger-en.png',
    ],
  },
  successfulResponse: true,
};

export default apVoucherImages;

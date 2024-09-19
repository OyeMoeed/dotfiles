import { GetShopOrderHistoryMockProps } from './get-shop-order-history.interface';

const getShopOrderHistoryMock: GetShopOrderHistoryMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC6c39d55938df4c0aac74b3a0e3c4c171',
    requestReference: '01009971995759254412',
  },
  paginationInfo: { matchedRecords: '1436', sentRecords: '1436' },
  response: {
    purchasedEvouchers: [
      {
        squanceNumber: 'EVCP080991NND7',
        requestId: 'EPY08099KFJXH',
        productId: '2650',
        merchantId: '283851',
        productNameAr: '500 Points Card',
        productNameEn: 'كارت بقيمة 500 نقطة',
        couponNumber: '3542003155',
        expiryDate: '',
        serialNumber: 'oca5253512586',
        costPriceBeforeVat: 187,
        costPriceVatAmount: 0,
        costPriceIncludingVat: 0,
        endUserPriceBeforeVAT: 195,
        endUserPriceVATAmount: 0,
        endUserPriceIncludingVAT: 195,
        imageURL: 'https://src.ocstaging.net/opt/tmp/onecard/images/product/bitaqty_image/2650',
        issueDate: '2008-04-08T17:06:00',
      },
      {
        squanceNumber: 'EVCP080995B80S',
        requestId: 'EPY080998C02X',
        productId: '2650',
        merchantId: '283851',
        productNameAr: '500 Points Card',
        productNameEn: 'كارت بقيمة 500 نقطة',
        couponNumber: '4250555535',
        expiryDate: '',
        serialNumber: 'oca4055905509',
        costPriceBeforeVat: 187,
        costPriceVatAmount: 0,
        costPriceIncludingVat: 0,
        endUserPriceBeforeVAT: 195,
        endUserPriceVATAmount: 0,
        endUserPriceIncludingVAT: 195,
        imageURL: 'https://src.ocstaging.net/opt/tmp/onecard/images/product/bitaqty_image/2650',
        issueDate: '2008-04-08T10:45:00',
      },
    ],
  },
  successfulResponse: true,
};

export default getShopOrderHistoryMock;

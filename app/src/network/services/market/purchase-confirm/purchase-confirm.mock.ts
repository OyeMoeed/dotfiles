import { PurchaseConfirmMockProps } from './purchase-confirm.interface';

const purchaseConfirmMock: PurchaseConfirmMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC4875a62ecc694638877dc2b4b29dfb93',
    requestReference: '04563778778615557494',
  },
  response: { referenceNumber: 'FT40123XFN10', serialNum: 'Qeyas-237', voucherPin: 'item_secret' },
  successfulResponse: true,
};

export default purchaseConfirmMock;

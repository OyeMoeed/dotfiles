import { WUTransferProps } from './wu-transfer.interface';

const wuTransferMock: WUTransferProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    transactionId: 'TRPAYC670819974d3346629626ff8d2f6ac5d6',
    exchangeRate: 'false',
    otpRef: '16768',
    referenceNumber: 'FT40123XFN10',
  },
  successfulResponse: true,
  ok: true,
  apiResponseNotOk: false,
};

export default wuTransferMock;

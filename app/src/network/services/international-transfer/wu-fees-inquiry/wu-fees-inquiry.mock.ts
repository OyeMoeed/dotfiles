import { WuFeesInquiryProps } from './wu-fees-inquiry.interface';

const wuFeesInquiryMock: WuFeesInquiryProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    principleAmount: '53.05',
    principleCurrency: 'USD',
    promoDiscount: '0.00',
    exchangeRate: '0.2652538',
    feeAmount: '0',
    vatAmount: '0',
    bankFeeAmount: '21.74',
    bankVatAmount: '3.26',
  },
  successfulResponse: true,
  ok: true,
  apiResponseNotOk: false,
};

export default wuFeesInquiryMock;

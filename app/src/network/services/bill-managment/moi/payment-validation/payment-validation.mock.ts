import { PaymentValidationMockProps } from './payment-validation.interface';

const paymentValidationMock: PaymentValidationMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    beneficiaryName: 'amr',
    previousUnusedBalance: '1000',
    totalFeeAmount: '200',
    referenceNumber: 'FT40123XFN10',
  },
  successfulResponse: true,
  ok: true,
};

export default paymentValidationMock;

import { MultiPaymentPrepareBillResponseTypes } from './multi-payment-prepare-bill.interface';

const multiPaymentPrepareBillMockResponse: MultiPaymentPrepareBillResponseTypes = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCad63e726368d495cb05646a7a2100cfc',
    requestReference: '08752626837454636497',
  },
  response: { otpRef: 'OTP23359192CN' },
  successfulResponse: true,
};

export default multiPaymentPrepareBillMockResponse;

import { MOIBillPaymentMockProps } from './bill-payment.interface';

const moiBillPaymentMock: MOIBillPaymentMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'mail.sent.success',
    sessionReference: 'SSPAYC0736946e059e4b8881d265d662ac4efc',
    requestReference: '08752626837454636506',
  },
  response: {
    payemntRefrenceInfo: '3000577523',
    totalAmount: '5.00',
    refundId: null,
    refundState: null,
    refundRejectionReason: null,
    feeAmount: null,
    vatAmount: null,
    transactionId: 'EPY23359N3KXZ',
  },
  successfulResponse: true,
  ok: true,
};

export default moiBillPaymentMock;

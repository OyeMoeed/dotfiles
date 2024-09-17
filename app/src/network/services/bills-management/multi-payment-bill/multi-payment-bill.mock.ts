import { MultiPaymentBillResponseTypes } from './multi-payment-bill.interface';

const multiPaymentBillMockResponse: MultiPaymentBillResponseTypes = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC31dea075087d4ef8ae4b3c686eadae13',
    requestReference: '08752626837454636492',
  },
  response: {
    billPaymentResponses: [
      {
        statusCode: 'I000000',
        billIndex: '0',
        payemntRefrenceInfo: '3000577341',
        totalAmount: '5.00',
        refundId: '',
        refundState: '',
        refundRejectionReason: '',
        feeAmount: '',
        vatAmount: '',
        transactionId: 'EPY23359DZ154',
      },
      {
        statusCode: 'I000000',
        billIndex: '0',
        payemntRefrenceInfo: '3000577341',
        totalAmount: '5.00',
        refundId: '',
        refundState: '',
        refundRejectionReason: '',
        feeAmount: '',
        vatAmount: '',
        transactionId: 'EPY23359DZ153',
      },
    ],
  },
  successfulResponse: true,
};

export default multiPaymentBillMockResponse;

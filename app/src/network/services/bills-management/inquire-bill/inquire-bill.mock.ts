import { InquireBillMockProps } from './inquire-bill.interface';

const saveBillMock: InquireBillMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC31dea075087d4ef8ae4b3c686eadae13',
    requestReference: '08752626837454636492',
    translation: '',
  },
  response: {
    billPaymentStatus: 'Completed',
    billPaymentStatusDesc: 'The payment was successfully processed.',
    showAmountGroup: true,
    dueDate: '2024-08-15',
    dueAmount: '150.00',
    amountHint: 'Please pay between the minimum and maximum amounts.',
    minimumAmount: '100.00',
    maximumAmount: '200.00',
    availableAmountList: ['100.00', '150.00', '200.00'],
    deductedAmount: '150.00',
  },
  successfulResponse: true,
};

export default saveBillMock;

import { DeleteBillMockProps } from './delete-bill.interface';

const deleteBillMock: DeleteBillMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC07cf9b3bc4284322a87cf49956eef924',
    requestReference: '08752626837454636550',
    translation: '',
  },
  response: {
    billStatus: 'Deleted',
  },
  successfulResponse: true,
};

export default deleteBillMock;

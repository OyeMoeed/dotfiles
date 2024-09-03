import { EditBillResponseTypes } from './edit-bill.interface';

const editBillMockResponse: EditBillResponseTypes = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCa2e9c2be38fc439ab41c9e7307dc7631',
    requestReference: '08752626837454636534',
  },
  response: {
    billId: 'BILL233592CP3LC5',
    billStatus: 'Enabled',
  },
  successfulResponse: true,
};

export default editBillMockResponse;

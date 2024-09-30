import { ActivateBillResponseProps } from './activate-bill.interface';

const activateBillMock: ActivateBillResponseProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC07cf9b3bc4284322a87cf49956eef924',
    requestReference: '08752626837454636550',
  },
  response: { billId: 'BILL233592CNVDKF', billStatus: 'Enabled' },
  successfulResponse: true,
};

export default activateBillMock;

import { SaveBillResponseTypes } from './save-bill.interface';

const saveBillMockResponse: SaveBillResponseTypes = {
  response: {
    billId: 'BILL242011H929NW',
    billStatus: 'Enabled',
  },
  successfulResponse: true,
  status: {
    sessionReference: 'SSPAYC76556d3de4ba4b688e91ceee23c6d748',
    code: 'I000000',
    requestReference: '03006772033783628665',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    translation: '',
  },
};

export default saveBillMockResponse;

import { MoiDynamicFieldsMockProps } from './get-dynamic-fields.interface';

const moiDynamicFieldsMock: MoiDynamicFieldsMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC0736946e059e4b8881d265d662ac4efc',
    requestReference: '08752626837454636506',
  },
  response: {
    dynamicFields: [
      {
        index: '2',
        value: 'Savings',
        type: 'TEXT',
        label: 'Account Type',
        required: false,
        minWidth: 50,
        maxWidth: 150,
      },
    ],
    showbillNumbertHint: true,
    billNumberHint: 'Enter your 10-digit bill number',
    billNumberLabel: 'Bill Number',
    customerIdType: { fieldIndex: 'ID Type', value: 'National ID' },
    minimumAmount: '100',
    maximumAmount: '1000',
    amountLovList: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  },
  successfulResponse: true,
  ok: true,
};

export default moiDynamicFieldsMock;

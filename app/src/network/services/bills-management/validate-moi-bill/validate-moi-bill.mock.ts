import { ValidateBillResponse } from './validate-moi-bill.interface';

const getDynamicFieldsMockResponse: ValidateBillResponse = {
  response: {
    beneficiaryName: 'amr',
    previousUnusedBalance: '1000',
    totalFeeAmount: '200',
    referenceNumber: 'FT40123XFN10',
  },
  successfulResponse: true,
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
};

export default getDynamicFieldsMockResponse;

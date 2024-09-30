import { ValidateBillResponse } from './validate-moi-bill.interface';

const ValidateBillMockResponse: ValidateBillResponse = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC7f37a9e8ade049aaa64a3af6c456096b',
    requestReference: '04166185668110636639',
  },
  response: {
    previousUnusedBalance: '0.0',
    totalFeeAmount: '0.0',
    groupPaymentId: '20242139',
    paymentId: '2024023921',
    paymentMethod: 'ACTDEB',
    billerId: '093',
    feeList: [
      {
        feeType: 'Type',

        feeAmount: 0,
      },
    ],
    beneficiaryName: 'amr',
    referenceNumber: 'FT40123XFN10',
    amount: 1000,
    serviceProvider: 'Traffic MOI',
    serviceType: 'Traffic violation',
    serviceId: '10061883685',
    violationNo: '2432533475',
    violationDate: '2024-03-14T17:15:30',
  },

  successfulResponse: true,
};

export default ValidateBillMockResponse;

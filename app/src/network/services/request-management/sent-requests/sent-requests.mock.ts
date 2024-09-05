import { GetAllRequestsMockProps, CreateMoneyRequestResponseTypes } from './sent-requests.interface';

const getAllRequestsMock: GetAllRequestsMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCbe72e8ca732846d68b77117a14a8af83',
    requestReference: '07118831450799381541',
  },
  paginationInfo: {
    matchedRecords: '20',
    sentRecords: '20',
  },

  response: {
    requests: [
      {
        transactionId: 'EPY08099V8QDS',
        transactionState: 'initiated',
        transactionTime: '2008-04-08T15:44:00',
        targetWalletNumber: '10142',
        targetFullName: 'Mohammed test testFamilyName',
        targetMobileNumber: '0583431010',
        targetAmount: '10.00',
      },
      {
        transactionId: 'EPY08099HKN31',
        transactionState: 'initiated',
        transactionTime: '2008-04-08T12:19:00',
        targetWalletNumber: '10142',
        targetFullName: 'SAHQB ABDULLAH ABDULAHMASAN ALRMOI',
        targetMobileNumber: '0508987485',
        targetAmount: '1.00',
      },
    ],
  },
  successfulResponse: true,
  ok: true,
};

const createMoneyRequestMockResponse: CreateMoneyRequestResponseTypes = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCe5830ecf0b854d7586686c2e5a857856',
    requestReference: '06851820381011026683',
  },
  response: {
    moneyRequestsResult: [
      {
        mobileNumber: '0583968704',
        amount: '1.00',
        note: 'labor send mony back to sponsor',
        walletNumber: '10587983',
        status: 'I000000',
        statusDesc: '',
      },
    ],
  },
  successfulResponse: true,
};

export { getAllRequestsMock, createMoneyRequestMockResponse };

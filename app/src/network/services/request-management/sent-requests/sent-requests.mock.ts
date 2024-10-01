import { CreateMoneyRequestResponseTypes, GetAllRequestsMockProps } from './sent-requests.interface';

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
        transactionState: 'cancelled',
        transactionTime: '2008-04-08T15:44:00',
        targetWalletNumber: '10142',
        targetFullName: 'Mohammed recived',
        targetMobileNumber: '0583431010',
        targetAmount: '100.00',
        transactionDescription: 'Hey Dear, I would like to send this amazing request',
        cancellation_date: '2008-04-08T16:00:00',
        realTransactionAmount: null,
        realTransactionTotalPaidAmount: null,
        realTransactionNumberOfPaymentRequests: null,
        targetProfileImage: null,
      },

      {
        transactionId: 'UPY080HHYN$',
        transactionState: 'executed',
        transactionTime: '2008-04-08T12:19:00',
        targetWalletNumber: '10142',
        targetFullName: 'SAHQB ABDULLAH ABDULAHMASAN ALRMOI',
        targetMobileNumber: '0508987485',
        targetAmount: '1.00',
        transactionDescription: 'test',
        realTransactionRefNumber: '123456789',
        payment_date: '2008-04-08T13:00:00',
        realTransactionAmount: null,
        realTransactionTotalPaidAmount: null,
        realTransactionNumberOfPaymentRequests: null,
        targetProfileImage: null,
      },
      {
        transactionId: 'EPY08099PENDING',
        transactionState: 'initiated',
        transactionTime: '2008-04-08T10:00:00',
        targetWalletNumber: '10142',
        targetFullName: 'John Doe',
        targetMobileNumber: '0501234567',
        targetAmount: '50.00',
        transactionDescription: 'Pending transaction',
        request_date: '2008-04-08T09:00:00',
        realTransactionAmount: null,
        realTransactionTotalPaidAmount: null,
        realTransactionNumberOfPaymentRequests: null,
        targetProfileImage: null,
        realTransactionRefNumber: 'FTA35346',
      },
      {
        transactionId: 'EPY08099REJECTED',
        transactionState: 'rejected',
        transactionTime: '2008-04-08T11:00:00',
        targetWalletNumber: '10142',
        targetFullName: 'Jane Smith',
        targetMobileNumber: '0507654321',
        targetAmount: '75.00',
        transactionDescription: 'Rejected transaction',
        rejection_date: '2008-04-08T12:00:00',
        realTransactionRefNumber: '987654321',
        realTransactionAmount: null,
        realTransactionTotalPaidAmount: null,
        realTransactionNumberOfPaymentRequests: null,
        targetProfileImage: null,
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
        amount: '10.00',
        note: 'labor send mony back to sponsor',
        walletNumber: '10587983',
        status: 'I000000',
        statusDesc: '',
      },
    ],
  },
  successfulResponse: true,
};

export { createMoneyRequestMockResponse, getAllRequestsMock };

import { ApiResponse } from '../../services.interface';
import { GetAllRequestsMockProps, SendRequestedMoneyConfirmRes } from './recevied-requests.interface';

//* ******************GetAllRequestsMock****************************//
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
        transactionState: 'cancel',
        transactionTime: '2008-04-08T15:44:00',
        targetWalletNumber: '10142',
        targetFullName: 'Mohammed recived',
        targetMobileNumber: '0583431010',
        targetAmount: '100.00',
        transactionDescription: 'test',
        cancellation_date: '2008-04-08T16:00:00',
      },

      {
        transactionId: 'UPY080HHYN$',
        transactionState: 'paid',
        transactionTime: '2008-04-08T12:19:00',
        targetWalletNumber: '10142',
        targetFullName: 'SAHQB ABDULLAH ABDULAHMASAN ALRMOI',
        targetMobileNumber: '0508987485',
        targetAmount: '1.00',
        transactionDescription: 'test',
        realTransactionRefNumber: '123456789',
        payment_date: '2008-04-08T13:00:00',
      },
      {
        transactionId: 'EPY08099PENDING',
        transactionState: 'pending',
        transactionTime: '2008-04-08T10:00:00',
        targetWalletNumber: '10142',
        targetFullName: 'John Doe',
        targetMobileNumber: '0501234567',
        targetAmount: '50.00',
        transactionDescription: 'Pending transaction',
        request_date: '2008-04-08T09:00:00',
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
      },
    ],
  },
  successfulResponse: true,
  ok: true,
};

//* ******************ReceivedRequestedMoneyConfirmMock****************************//

const receivedRequestedMoneyConfirmMock: ApiResponse<SendRequestedMoneyConfirmRes> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCeb0e8fae63324e43a6ee4af6586dd8b5',
    requestReference: '06851820381011026625',
  },
  response: {
    transctionRefNumber: 'EPY23358VMLJ3',
    transactionId: 'EPY23358VMLJ3',
    totalTansactionAmount: '15.00',
    beneficiaryName: ' ',
  },
  successfulResponse: true,
};

export { getAllRequestsMock, receivedRequestedMoneyConfirmMock };

import { GetAllRequestsMockProps } from './sent-requests.interface';

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
        targetFullName: 'Mohammed sente',
        targetMobileNumber: '0583431010',
        targetAmount: '11.00',
      },
      {
        transactionId: 'EPY08099HKN31',
        transactionState: 'paid',
        transactionTime: '2008-04-08T12:19:00',
        targetWalletNumber: '10142',
        targetFullName: 'SAHQB ABDULLAH ABDULAHMASAN ALRMOI',
        targetMobileNumber: '0508987485',
        targetAmount: '1.00',
      },
      {
        transactionId: 'EPY08099HKN31',
        transactionState: 'cancelled',
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

export default getAllRequestsMock;

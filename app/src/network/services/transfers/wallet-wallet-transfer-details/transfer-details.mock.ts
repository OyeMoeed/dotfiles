import { TransferDetailsMockProps } from './transfer-details.interface';

const transferDetailsMock: TransferDetailsMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC0a088beff71b4b0ab1adfcb20bd1c5fa',
    requestReference: '03196435797915013355',
  },
  response: {
    amount: '12.00',
    receiverWalletNumber: '10142',
    senderWalletNumber: '20004141',
    receiverName: 'PRABAKARAN',
    trnsDateTime: '2008-04-08T17:17:00',
    bankFeeAmt: null,
    receiverMobile: '0583433324',
    senderMobile: '0523614587',
    feeAmt: null,
    parentRequestID: 'EPY08099J8M75',
    senderName: 'AIW20004141',
    requestID: 'EPY08099J8M75',
    vatAmt: null,
    bankVATAmt: null,
    userNotes: 'eid 6#Eid_6',
    status: 'opened',
    giftCategory: 'Eid_2',
  },
  successfulResponse: true,
  ok: true,
};

export default transferDetailsMock;

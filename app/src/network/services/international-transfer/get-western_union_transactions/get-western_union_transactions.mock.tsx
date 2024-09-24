import { WuTransactionsResponse } from './get-western_union_transactions.interface';

const wuTransactions: WuTransactionsResponse = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'TransferManagement.SpeedRemitanceTransfersInquiryService.getWesternUnionTransactions.messege.success',
    sessionReference: 'SSPAYCbde1c6a47241400a95d06711658f81ce',
    requestReference: '06851820381011026707',
  },
  response: {
    fromDate: '2024-06-14',
    toDate: '2024-07-14',
    transactions: [
      {
        westernUnionReferenceNumber: 'WU123456789',
        fundTransferReferenceNumber: 'FT987654321',
        date: '2024-07-15',
        status: 'SUCCESS',
        statusDesc: 'Transaction successful',
        totalAmount: '500.00',
        moneyTransferControlNumber: 'ABC123XYZ456',
        refundEnabled: true,
        updateEnabled: false,
        inquiryEnabled: true,
        beneficiaryName: 'John Doe',
      },
    ],
  },
  successfulResponse: true,
};

export default wuTransactions;

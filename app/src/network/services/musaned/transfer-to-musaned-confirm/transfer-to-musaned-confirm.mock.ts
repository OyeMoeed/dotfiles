import { ApiResponse } from '../../services.interface';
import { TransferToMusanedConfirmMockProps } from './transfer-to-musaned-confirm.interface';

const musanedInquiryMock: TransferToMusanedConfirmMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC8e49f187482f439ebeaae907bfa13650',
    requestReference: '05884201404937392329',
  },
  authentication: {
    transactionId: 'TRPAYCb1e370a7ef8048bcaec673696bda6bb6',
  },
  response: {
    mobileNumber: '1234567890',
    amount: '100.00',
    walletNumber: '12346',
    beneficiaryName: 'John Doe',
    trxDateTime: '2024-07-17T15:30:00',
    salaryMonth: 'July 2024',
    transferJustificationDescription: 'Salary transfer',
    transactionId: 'XYZ123456789',
  },
  successfulResponse: true,
};

export default musanedInquiryMock;

import { TransferToMusanedPrepareMockProps } from './transfer-to-musaned-prepare.interface';

const musanedInquiryMock: TransferToMusanedPrepareMockProps = {
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
    otpRef: 'OTP08099YSZTQ',
  },
  successfulResponse: true,
};

export default musanedInquiryMock;

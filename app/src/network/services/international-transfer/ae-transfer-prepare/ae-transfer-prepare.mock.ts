import { AETransferPrepareProps } from './ae-transfer-prepare.interface';

const aeTransferPrepareMock: AETransferPrepareProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd06b1948aaae4349a67292c0a199ef60',
    requestReference: '03252962744056970405',
  },
  authentication: {
    transactionId: 'TRPAYC113071d0c5304a429fb3462451307077',
  },
  response: {
    otpRef: 'OTP08099LMZT8',
  },
  successfulResponse: true,
  ok: true,
  apiResponseNotOk: false,
};

export default aeTransferPrepareMock;

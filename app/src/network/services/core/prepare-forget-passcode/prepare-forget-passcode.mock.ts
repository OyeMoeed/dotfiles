import { PrepareForgetPasscodeMockProps } from './prepare-forget-passcode.interface';

const prepareForgetPasscodeMock: PrepareForgetPasscodeMockProps = {
  data: {
    status: {
      code: 'I000000',
      type: 'SUCCESS',
      desc: 'retail.msg.default.success',
      sessionReference: 'SSPAYCa5eecb173d1c4a0abd80810ece9cef4b',
      requestReference: '03328045608758016839',
    },
    response: {
      walletNumber: '10587982',
      otpRef: 'OTP233591PFJF',
    },
    successfulResponse: true,
  },
  ok: true,
};

export default prepareForgetPasscodeMock;

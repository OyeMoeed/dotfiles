import { PrepareForgetPasscodeDataProps } from './prepare-forget-passcode.interface';

const validateForgetPasscodeMock: PrepareForgetPasscodeDataProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    requestReference: '05245691655870309527',
  },
  response: {
    walletNumber: '10588037',
    otpRef: 'OTP23359WW3B3',
  },
  successfulResponse: true,
};

export default validateForgetPasscodeMock;

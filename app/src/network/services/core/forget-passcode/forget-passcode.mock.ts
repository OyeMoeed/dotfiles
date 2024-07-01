import { ForgetPasscodeResponseProps } from './forget-passcode.interface';

const forgetPasscodeMock: ForgetPasscodeResponseProps = {
  data: {
    status: {
      code: 'I000000',
      type: 'SUCCESS',
      desc: 'retail.msg.default.success',
      sessionReference: 'SSPAYCa5eecb173d1c4a0abd80810ece9cef4b',
      requestReference: '03328045608758016840',
    },
    response: {
      redirectToLogin: false,
    },
    successfulResponse: true,
  },
  ok: true,
};

export default forgetPasscodeMock;

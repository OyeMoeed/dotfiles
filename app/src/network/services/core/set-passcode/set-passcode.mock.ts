import { SetPasscodeMockDataProps } from './set-passcode.interface';

const setPasscodeMock: SetPasscodeMockDataProps = {
  response: {
    channelId: 'WLTG',
    hasErsalAccount: false,
    hasInmaAccount: false,
    iamRequestId: 'f1fd00c7eb4a4af99fa63fef7d7354b7',
    walletNumber: '20004302',

    code: 'I000000',
    desc: 'retail.msg.default.success',
    requestReference: '00077088551975830391',
    sessionReference: 'SSPAYC1379bb20a2604707b0fe7ee5f2468c29',
    type: 'SUCCESS',
    successfulResponse: true,
  },
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCa5eecb173d1c4a0abd80810ece9cef4b',
    requestReference: '03328045608758016839',
  },
};

export default setPasscodeMock;

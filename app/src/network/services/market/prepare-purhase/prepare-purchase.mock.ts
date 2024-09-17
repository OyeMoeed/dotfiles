import { PreparePurchaseMockProps } from './prepare-purhase.interface';

const preparePurchaseMock: PreparePurchaseMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCedb9b22031ed46cdaa02fa6a7459313b',
    requestReference: '01009971995759254411',
  },
  response: { otpRef: 'OTP080992LGHL' },
  successfulResponse: true,
};

export default preparePurchaseMock;

import { ChangeLanguageMockProps } from './change-language.interface';

const changeLanguageMock: ChangeLanguageMockProps = {
  data: {
    status: {
      code: 'I000000',
      type: 'SUCCESS',
      desc: 'retail.msg.default.success',
      sessionReference: 'SSPAYC0986bbcbbbb84505a109e2c90c36aeaa',
      requestReference: '04750492912245578553',
    },
    response: {
      walletNumber: '10587981',
      walletStatus: 'A',
      walletTier: 'G',
      availableBalance: '1770.92',
      currentBalance: '1775.92',
      dormant: false,
      idExpired: false,
    },
    successfulResponse: true,
  },
  ok: true,
};

export default changeLanguageMock;

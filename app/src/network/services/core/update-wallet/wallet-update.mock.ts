import { WalletUpdateMockProps } from './update-wallet.interface';

const walletUpdateMock: WalletUpdateMockProps = {
  data: {
    response: {
      dormant: false,
      currentBalance: '76579.00',
      walletStatus: 'A',
      idExpired: false,
      walletTier: 'P',
      walletNumber: '10142',
      availableBalance: '51217.48',
    },
    successfulResponse: true,
    status: {
      sessionReference: 'SSPAYC5c2207e5333046a780efc88f0d60fc23',
      code: 'I000000',
      requestReference: '03939829382653694683',
      type: 'SUCCESS',
      desc: 'retail.msg.default.success',
    },
  },
  ok: true,
};

export default walletUpdateMock;

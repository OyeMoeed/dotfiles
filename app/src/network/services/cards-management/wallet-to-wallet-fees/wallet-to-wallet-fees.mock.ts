import { ApiResponse } from '../../services.interface';
import { IW2WFeesRes } from './wallet-to-wallet-fees.interface';

const wallet2WalletFeesMock: ApiResponse<IW2WFeesRes> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'Alinmapay.cardManagement.feesInquiry.getFees.messege.success',
    sessionReference: 'SSPAYC911cd8b8bd1c4f5d941b905f2954682e',
    requestReference: '02454362224854245995',
  },
  response: {
    requests: [
      {
        mobileNumber: '0568908077',
        amount: '1',
        note: '',
        walletNumber: null,
        giftCategory: null,
        feesAmount: '0.00',
        vatAmount: '0.00',
      },
    ],
  },
  successfulResponse: true,
};

export default wallet2WalletFeesMock;

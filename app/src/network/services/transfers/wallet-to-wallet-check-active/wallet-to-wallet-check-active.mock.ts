import { ApiResponse } from '../../services.interface';
import { IW2WCheckActiveRes } from './wallet-to-wallet-check-active.interface';

const wallet2WalletCheckActiveMock: ApiResponse<IW2WCheckActiveRes> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'alinmapay.w2wTransferService.getWalletFriends.messege.success',
    sessionReference: 'SSPAYCeb0e8fae63324e43a6ee4af6586dd8b5',
    requestReference: '06851820381011026620',
  },
  response: {
    friends: [
      {
        walletNumber: '10587982',
        nickName: 'SAHQB ABDULLAH ABDULAHMASAN ALRMOI',
        mobileNumber: '0568977738',
        favouritFriend: null,
        profileImage: null,
        frequent: true,
        eligible: true,
      },
      {
        walletNumber: '10587987',
        nickName: 'SAHQB ABDULLAH ABDULAHMASAN ALRMOI',
        mobileNumber: '0581936578',
        favouritFriend: null,
        profileImage: null,
        frequent: true,
        eligible: true,
      },
    ],
  },
  successfulResponse: true,
};

export default wallet2WalletCheckActiveMock;

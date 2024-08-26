import { ApiResponse } from '../../services.interface';
import { IW2WTransferConfirmRes } from './wallet-to-wallet-transfer-confirm.interface';

const wallet2WalletCheckActiveMock: ApiResponse<IW2WTransferConfirmRes> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCeb0e8fae63324e43a6ee4af6586dd8b5',
    requestReference: '06851820381011026625',
  },
  response: {
    transferRequestsResult: [
      {
        mobileNumber: '0583968704',
        amount: '1.00',
        note: 'labor send mony back to sponsor',
        walletNumber: '10587983',
        status: 'I000000',
        statusDesc: null,
        transactionId: 'EPY23359JVXKJ',
      },
    ],
  },
  successfulResponse: true,
};
export default wallet2WalletCheckActiveMock;

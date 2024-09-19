import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import TRANSFERS_URLS from '../transfer.urls';
import { IW2WTransferConfirmReq, IW2WTransferConfirmRes } from './wallet-to-wallet-transfer-confirm.interface';
import wallet2WalletCheckActiveMock from './wallet-to-wallet-transfer-confirm.mock';

const walletToWalletTransferConfirm = async (
  walletNumber: string,
  payload: IW2WTransferConfirmReq,
): Promise<ApiResponse<IW2WTransferConfirmRes> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return wallet2WalletCheckActiveMock;
  }

  const apiResponse = await apiCall<IW2WTransferConfirmRes>({
    endpoint: TRANSFERS_URLS.wallet_to_wallet_transfer_confirm(walletNumber),
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export default walletToWalletTransferConfirm;

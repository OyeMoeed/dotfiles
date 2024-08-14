import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '../../services.interface';
import TRANSFERS_URLS from '../transfer.urls';
import { IW2WTransferPrepareReq, IW2WTransferPrepareRes } from './wallet-to-wallet-transfer-prepare.interface';

const walletToWalletTransferPrepare = async (
  walletNumber: string,
  payload: IW2WTransferPrepareReq,
): Promise<ApiResponse<IW2WTransferPrepareRes>> => {
  try {
    const apiResponse = await apiCall<IW2WTransferPrepareRes>({
      endpoint: TRANSFERS_URLS.wallet_to_wallet_transfer_prepare(walletNumber),
      method: requestType.POST,
      payload,
    });
    return apiResponse;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

export default walletToWalletTransferPrepare;

import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '../../services.interface';
import TRANSFERS_URLS from '../transfer.urls';
import { IW2WCheckActiveReq, IW2WCheckActiveRes } from './wallet-to-wallet-check-active.interface';

const walletToWalletCheckActive = async (
  walletNumber: string,
  payload: IW2WCheckActiveReq,
): Promise<ApiResponse<IW2WCheckActiveRes>> => {
  try {
    const apiResponse = await apiCall<IW2WCheckActiveRes>({
      endpoint: TRANSFERS_URLS.wallet_to_wallet_check_active(walletNumber),
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

export default walletToWalletCheckActive;

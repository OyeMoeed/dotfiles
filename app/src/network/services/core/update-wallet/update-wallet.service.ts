import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { IUpdateWalletResponse, IWalletUpdatePayload } from './update-wallet.interface';
import { ApiResponse, IApiStatus } from '../../services.interface';

const walletUpdate = async (
  payload: IWalletUpdatePayload,
  walletNumber: string,
): Promise<ApiResponse<IUpdateWalletResponse>> => {
  try {
    const apiResponse = await apiCall<IUpdateWalletResponse>({
      endpoint: CORE_URLS.update_wallet(walletNumber),
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

export default walletUpdate;

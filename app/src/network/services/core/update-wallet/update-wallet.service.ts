import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '../../services.interface';
import CORE_URLS from '../core.urls';
import { IUpdateWalletResponse, IWalletUpdatePayload } from './update-wallet.interface';
import walletUpdateMock from './wallet-update.mock';

const walletUpdate = async (
  payload: IWalletUpdatePayload,
  walletNumber: string,
): Promise<ApiResponse<IUpdateWalletResponse>> => {
  if (constants.MOCK_API_RESPONSE) {
    return walletUpdateMock;
  }
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

export const removeProfileImage = async (walletNumber: string): Promise<ApiResponse<IUpdateWalletResponse>> => {
  const apiResponse = await apiCall<IUpdateWalletResponse>({
    endpoint: CORE_URLS.remove_profile_image(walletNumber),
    method: requestType.DELETE,
  });
  return apiResponse;
};

export default walletUpdate;

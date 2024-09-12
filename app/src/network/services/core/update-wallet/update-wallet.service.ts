import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import CORE_URLS from '../core.urls';
import { IUpdateWalletResponse, IWalletUpdatePayload } from './update-wallet.interface';
import walletUpdateMock from './wallet-update.mock';

const walletUpdate = async (
  payload: IWalletUpdatePayload,
  walletNumber: string,
): Promise<ApiResponse<IUpdateWalletResponse>> => {
  if (constants.MOCK_API_RESPONSE) {
    return walletUpdateMock as any;
  }

  const apiResponse: any = await apiCall<IUpdateWalletResponse>({
    endpoint: CORE_URLS.update_wallet(walletNumber),
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export const removeProfileImage = async (walletNumber: string): Promise<ApiResponse<IUpdateWalletResponse>> => {
  const apiResponse: any = await apiCall<IUpdateWalletResponse>({
    endpoint: CORE_URLS.remove_profile_image(walletNumber),
    method: requestType.DELETE,
  });
  return apiResponse;
};

export default walletUpdate;

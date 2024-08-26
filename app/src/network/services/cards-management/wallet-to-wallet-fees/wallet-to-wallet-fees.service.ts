import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '../../services.interface';
import CARDS_MANAGEMENT_URLS from '../cards-management.urls';
import { IW2WFeesReq, IW2WFeesRes } from './wallet-to-wallet-fees.interface';
import wallet2WalletFeesMock from './wallet-to-wallet-fees.mock';

const getWalletToWalletFees = async (walletNumber: string, payload: IW2WFeesReq): Promise<ApiResponse<IW2WFeesRes>> => {
  if (constants.MOCK_API_RESPONSE) {
    const mockResponse = wallet2WalletFeesMock;
    return mockResponse;
  }
  try {
    const apiResponse = await apiCall<IW2WFeesRes>({
      endpoint: CARDS_MANAGEMENT_URLS.transfer_to_wallet_fees(walletNumber),
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

export default getWalletToWalletFees;

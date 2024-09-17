import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import TRANSFERS_URLS from '../transfer.urls';
import { ExecuteGiftMockProps, ExecuteGiftPayload } from './execute-gift.interface';
import executeGiftMock from './execute-gift.mock';

const executeGift = async (walletNumber: string, payload: ExecuteGiftPayload): Promise<ExecuteGiftMockProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return executeGiftMock;
  }
  try {
    const apiResponse: ApiResponse<ExecuteGiftMockProps> = await apiCall({
      endpoint: TRANSFERS_URLS.get_wallet_to_wallet_transfer(walletNumber),
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default executeGift;

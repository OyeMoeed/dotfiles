import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { WalletUpdateResponsePayloadProps } from './update-wallet.interface';
import walletUpdateMock from './wallet-update.mock';

const walletUpdate = async (payload: WalletUpdateResponsePayloadProps): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return walletUpdateMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.UPDATE_WALLET(payload.walletNumber),
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default walletUpdate;

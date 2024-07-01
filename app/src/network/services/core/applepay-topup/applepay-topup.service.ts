import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { WalletNumberProp } from './applepay-topup.interface';
import applepayTopupMock from './applepay-topup.mock';

const applepayTopup = async (payload: WalletNumberProp): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return applepayTopupMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.APPLEPAY_TOP_UP(payload.walletNumber),
      method: requestType.GET,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true, apiResponse };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default applepayTopup;

import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { WalletNumberProp } from './topup-cards.interface';
import topupCardsMock from './topup-cards.mock';

const getTopupCards = async (payload: WalletNumberProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return topupCardsMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.GET_TOP_UP_CARDS(payload.walletNumber),
      method: requestType.GET,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getTopupCards;

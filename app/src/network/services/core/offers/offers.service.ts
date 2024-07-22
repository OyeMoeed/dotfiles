import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { HomeOffersProp } from './offers.interface';
import getOffersMock from './offers.mock';

const getOffers = async (payload: HomeOffersProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getOffersMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.GET_HOME_OFFERS(payload?.walletNumber, payload?.isHome),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === "SUCCESS") {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getOffers;

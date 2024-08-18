import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { APIResponseType } from '@app/utilities/enums.util';
import CORE_URLS from '../core.urls';
import { GetOffersPayload, OffersResponseDetails } from './offers.interface';
import getOffersMock from './offers.mock';

const getOffers = async (payload: GetOffersPayload): Promise<OffersResponseDetails> => {
  if (constants.MOCK_API_RESPONSE) {
    if (payload.id) {
      const filteredOffers = getOffersMock.response.offers.filter((el) => el.id === payload.id);
      return {
        ...getOffersMock,
        response: {
          offers: filteredOffers,
        },
      };
    }
    return getOffersMock;
  }
  try {
    const apiResponse: OffersResponseDetails = await apiCall({
      endpoint: CORE_URLS.GET_HOME_OFFERS(
        payload.walletNumber,
        payload.offset,
        payload.maxRecords,
        payload.fromDate,
        payload.toDate,
        payload.id,
        payload.home,
      ),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getOffers;

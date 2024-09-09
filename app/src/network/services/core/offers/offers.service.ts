import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { APIResponseType } from '@app/utilities/enums.util';
import CORE_URLS from '../core.urls';
import { GetOffersPayload, OffersResponseDetails } from './offers.interface';
import getOffersMock from './offers.mock';

const getQueryURL = (
  baseUrl: string,
  offset?: number,
  maxRecords?: number,
  fromDate?: string,
  toDate?: string,
  id?: string,
  home?: boolean,
) => {
  const params: { [key: string]: string | number | boolean | undefined } = {};

  if (offset !== undefined) params.offset = offset;
  if (maxRecords !== undefined) params['max-records'] = maxRecords;
  if (fromDate) params['from-date'] = fromDate;
  if (toDate) params['to-date'] = toDate;
  if (id) params.id = id;
  if (home !== undefined) params.home = home;

  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
    .join('&');

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

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

  const apiResponse: any = await apiCall({
    endpoint: getQueryURL(
      CORE_URLS.GET_HOME_OFFERS(payload.walletNumber),
      payload.offset,
      payload.maxRecords,
      payload.fromDate,
      payload.toDate,
      payload.id,
      payload.home,
    ),
    method: requestType.GET,
  });

  return apiResponse;
};

export default getOffers;

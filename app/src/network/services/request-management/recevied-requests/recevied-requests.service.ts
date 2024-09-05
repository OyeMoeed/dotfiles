import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';

import apiCall from '../../api-call.service';
import getAllRequestsMock from './recevied-requests.mock';
import { WalletNumberProp } from './recevied-requests.interface';
import REQUEST_MANAGEMENT_URLS from '../request-management.urls';

/**
 * Fetches all received requests for a given wallet number.
 *
 * @param {WalletNumberProp} payload - The payload containing the wallet number.
 * @returns {Promise<unknown>} - A promise that resolves to the API response or mock data.
 */
const getAllRecivedRequests = async (payload: WalletNumberProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getAllRequestsMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: REQUEST_MANAGEMENT_URLS.getAllRequests(payload?.walletNumber),
      method: requestType.GET,
      headers: {
        mode: 'FROM',
        offset: '1',
        state: 'initiated',
        'max-record': 100,
      },
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getAllRecivedRequests;

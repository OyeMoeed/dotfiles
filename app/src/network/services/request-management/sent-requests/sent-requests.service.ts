import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';

import apiCall from '../../api-call.service';
import { WalletNumberProp } from './sent-requests.interface';
import getAllRequestsMock from './sent-requests.mock';
import REQUEST_MANAGEMENT_URLS from '../request-management.urls';

/**
 * Fetches all received requests for a given wallet number.
 *
 * @param {WalletNumberProp} payload - The payload containing the wallet number.
 * @returns {Promise<unknown>} - A promise that resolves to the API response or mock data.
 */
const getAllSentRequests = async (payload: WalletNumberProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getAllRequestsMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: REQUEST_MANAGEMENT_URLS.getAllRequests(payload?.walletNumber, 'TO', payload.currentPage, 20),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getAllSentRequests;

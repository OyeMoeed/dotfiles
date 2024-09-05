import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';

import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '../../api-call.service';
import { getAllRequestsMock, createMoneyRequestMockResponse } from './sent-requests.mock';
import {
  WalletNumberProp,
  CreateMoneyRequestPayloadTypes,
  CreateMoneyRequestResponseTypes,
} from './sent-requests.interface';
import REQUEST_MANAGEMENT_URLS from '../request-management.urls';

/**
 * Fetches all received requests for a given wallet number.
 *
 * @param {WalletNumberProp} payload - The payload containing the wallet number.
 * @returns {Promise<unknown>} - A promise that resolves to the API response or mock data.
 */
const getAllRequests = async (payload: WalletNumberProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getAllRequestsMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: REQUEST_MANAGEMENT_URLS.getAllRequests(payload?.walletNumber),
      method: requestType.GET,
      headers: {
        mode: 'TO',
        offset: '1',
        state: 'initiated',
        maxRecords: '300',
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

const createMoneyRequestService = async (
  walletNumber: string,
  payload: CreateMoneyRequestPayloadTypes,
): Promise<CreateMoneyRequestResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return createMoneyRequestMockResponse;
  }
  try {
    const apiResponse: CreateMoneyRequestResponseTypes = await apiCall({
      endpoint: REQUEST_MANAGEMENT_URLS.create_money_request(walletNumber),
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return apiResponse;
    }

    return { apiResponseNotOk: true, apiResponse };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export { getAllRequests, createMoneyRequestService };

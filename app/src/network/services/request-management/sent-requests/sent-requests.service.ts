import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';

import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '../../api-call.service';
import REQUEST_MANAGEMENT_URLS from '../request-management.urls';
import {
  CreateMoneyRequestPayloadTypes,
  CreateMoneyRequestResponseTypes,
  WalletNumberProp,
} from './sent-requests.interface';
import { createMoneyRequestMockResponse, getAllRequestsMock } from './sent-requests.mock';

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
      endpoint: REQUEST_MANAGEMENT_URLS.getAllRequests(payload?.walletNumber, 'FROM', payload.currentPage, 20),
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

export { createMoneyRequestService, getAllSentRequests };

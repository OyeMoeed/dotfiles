import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';

import apiCall from '../../api-call.service';
import { getAllRequestsMock, receivedRequestedMoneyConfirmMock } from './recevied-requests.mock';
import {
  SendRequestedMoneyConfirmReq,
  SendRequestedMoneyConfirmRes,
  SendRequestedMoneyPrepareReq,
  SendRequestedMoneyPrepareRes,
  WalletNumberProp,
} from './recevied-requests.interface';
import REQUEST_MANAGEMENT_URLS from '../request-management.urls';
import { ApiResponse, IApiStatus } from '../../services.interface';

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
        // eslint-disable-next-line @typescript-eslint/naming-convention
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

/**
 * Prepares to send requested money.
 *
 * @param {string} walletNumber - The wallet number.
 * @param {string} transactionId - The transaction ID.
 * @param {SendRequestedMoneyPrepareReq} payload - The payload containing the device information.
 * @returns {Promise<ApiResponse<SendRequestedMoneyPrepareRes>>} - A promise that resolves to the API response.
 */
const sendRequestedMoneyPrepare = async (
  walletNumber: string,
  transactionId: string,
  payload: SendRequestedMoneyPrepareReq,
): Promise<ApiResponse<SendRequestedMoneyPrepareRes>> => {
  try {
    const apiResponse = await apiCall<SendRequestedMoneyPrepareRes>({
      endpoint: REQUEST_MANAGEMENT_URLS.recevied_request_prepare(walletNumber, transactionId),
      method: requestType.POST,
      payload,
    });
    return apiResponse;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

/**
 * prepare a confirmation for the requested money.
 *
 * @param {string} walletNumber - The wallet number.
 * @param {string} transactionId - The transaction ID.
 * @param {SendRequestedMoneyConfirmReq} payload - The payload containing the device information.
 * @returns {Promise<ApiResponse<SendRequestedMoneyConfirmRes>>} - A promise that resolves to the API response.
 */
const sendRequestedMoneyConfirm = async (
  walletNumber: string,
  transactionId: string,
  payload: SendRequestedMoneyConfirmReq,
): Promise<ApiResponse<SendRequestedMoneyConfirmRes>> => {
  if (constants.MOCK_API_RESPONSE) {
    return receivedRequestedMoneyConfirmMock;
  }
  try {
    const apiResponse = await apiCall<SendRequestedMoneyConfirmRes>({
      endpoint: REQUEST_MANAGEMENT_URLS.recevied_request_confirm(walletNumber, transactionId),
      method: requestType.POST,
      payload,
    });
    return apiResponse;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

export { getAllRecivedRequests, sendRequestedMoneyPrepare, sendRequestedMoneyConfirm };

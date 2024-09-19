import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import CORE_URLS from '../core.urls';
import { CheckOutProp, CheckStatusProp, TopUpCardsRes, WalletNumberProp } from './topup-cards.interface';
import { topupCardsMock, topupCardStatusMock } from './topup-cards.mock';

const getTopupCards = async (payload: WalletNumberProp): Promise<ApiResponse<TopUpCardsRes>> => {
  if (constants.MOCK_API_RESPONSE) {
    return topupCardsMock;
  }

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.GET_TOPUP_CARDS(payload?.walletNumber),
    method: requestType.GET,
  });
  return apiResponse;
};

export const deleteSavedCard = async (walletNumber: string, registrationId: string): Promise<ApiResponse<any>> => {
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.deleteTopupCard(walletNumber, registrationId),
    method: requestType.DELETE,
  });
  return apiResponse;
};

const topupCheckout = async (payload: CheckOutProp): Promise<unknown> => {
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.TOPUP_CHECK_OUT(payload?.walletNumber),
    method: requestType.POST,
    payload: payload?.checkOutBody,
  });

  return apiResponse;
};

const topupCheckStatus = async (payload: CheckStatusProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return topupCardStatusMock;
  }
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.CHECK_STATUS(payload?.walletNumber, payload?.refNumber),
    method: requestType.GET,
  });

  return apiResponse;
};

export { getTopupCards, topupCheckout, topupCheckStatus };

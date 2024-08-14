import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { CheckOutProp, CheckStatusProp, WalletNumberProp } from './topup-cards.interface';
import topupCardsMock from './topup-cards.mock';


const getTopupCards = async (payload: WalletNumberProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return topupCardsMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.GET_TOPUP_CARDS(payload?.walletNumber),
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


const topupCheckout = async (payload: CheckOutProp): Promise<unknown> => {
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.TOPUP_CHECK_OUT(payload?.walletNumber),
      method: requestType.POST,
      payload: payload?.checkOutBody
    });


    if (apiResponse?.status?.type === "SUCCESS") {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};


const topupCheckStatus = async (payload: CheckStatusProp): Promise<unknown> => {
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.CHECK_STATUS(payload?.walletNumber, payload?.refNumber),
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


export  {getTopupCards, topupCheckout, topupCheckStatus};

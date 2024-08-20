import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { ApplePayCheckOutReq, ApplePayCheckOutRes } from './apple-pay-check-out.interface';

const applePayCheckout = async (walletNumber: string , applePayCheckOutPayload : ApplePayCheckOutReq): Promise<ApiResponse<ApplePayCheckOutRes>> => {
  try {
    const apiResponse = await apiCall<ApplePayCheckOutRes>({
      endpoint: CARDS_MANAGEMENT_URLS.applePayCheckOut(walletNumber),
      method: requestType.POST,
      payload : applePayCheckOutPayload
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

export default applePayCheckout;
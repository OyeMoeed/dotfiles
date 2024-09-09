import requestType from '@app/network/request-types.network';
import { ApiResponse } from '@app/network/services/services.interface';
import apiCall from '@network/services/api-call.service';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { ApplePayCheckOutReq, ApplePayCheckOutRes } from './apple-pay-check-out.interface';

const applePayCheckout = async (
  walletNumber: string,
  applePayCheckOutPayload: ApplePayCheckOutReq,
): Promise<ApiResponse<ApplePayCheckOutRes>> => {
  const apiResponse: any = await apiCall<ApplePayCheckOutRes>({
    endpoint: CARDS_MANAGEMENT_URLS.applePayCheckOut(walletNumber),
    method: requestType.POST,
    payload: applePayCheckOutPayload,
  });

  return apiResponse;
};

export default applePayCheckout;

import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from './../cards-management.urls';
import { CardStatusReq, CardStatusRes } from './card-status.interface';

const changeCardStatus = async ( walletNumber: string,  body: CardStatusReq): Promise<ApiResponse<CardStatusRes>> => {
  try {
    const apiResponse = await apiCall<CardStatusRes>({
      endpoint: CARDS_MANAGEMENT_URLS.changeCardStatus(walletNumber),
      method: requestType.POST,
      payload: body,
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

export default changeCardStatus;

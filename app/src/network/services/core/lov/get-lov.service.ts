import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '../../services.interface';
import CORE_URLS from '../core.urls';
import { IGetLovPayload, IGetLovResponse } from './get-lov.interface';

const getLov = async (payload: IGetLovPayload): Promise<ApiResponse<IGetLovResponse>> => {
  try {
    const apiResponse = await apiCall<IGetLovResponse>({
      endpoint: CORE_URLS.GET_LOV,
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

export default getLov;

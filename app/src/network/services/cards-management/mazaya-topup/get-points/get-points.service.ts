import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { IAktharPointsResponse } from './get-points.interface';

const getAktharPoints = async (walletNumber: string): Promise<ApiResponse<IAktharPointsResponse>> => {
  try {
    const apiResponse = await apiCall<IAktharPointsResponse>({
      endpoint: CARDS_MANAGEMENT_URLS.akthar_points(walletNumber),
      method: requestType.GET,
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

export default getAktharPoints;

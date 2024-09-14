import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponse } from '@app/network/services/services.interface';
import apiCall from '@network/services/api-call.service';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { IAktharPointsResponse } from './get-points.interface';
import mock from './get-points.mock';

const getAktharPoints = async (walletNumber: string): Promise<ApiResponse<IAktharPointsResponse> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return mock as any;
  }

  const apiResponse = await apiCall<IAktharPointsResponse>({
    endpoint: CARDS_MANAGEMENT_URLS.akthar_points(walletNumber),
    method: requestType.GET,
  });
  return apiResponse;
};

export default getAktharPoints;

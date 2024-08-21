import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import CORE_URLS from '../core.urls';
import { UpdateBiomatricStatusProps } from './update-biomatric-status.interface';
import updateBiomatricStatusMock from './update-biomatric-status.mock';

const updateBiomatricStatus = async (
  payload: UpdateBiomatricStatusProps,
  walletNumber: string,
): Promise<ApiResponse<{}>> => {
    if (constants.MOCK_API_RESPONSE) {
      return updateBiomatricStatusMock;
    }
  try {
    const apiResponse = await apiCall<{}>({
      endpoint: CORE_URLS.UPDATE_BIOMATRIC_STATUS(walletNumber),
      method: requestType.POST,
      payload,
    });

    return apiResponse;
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default updateBiomatricStatus;

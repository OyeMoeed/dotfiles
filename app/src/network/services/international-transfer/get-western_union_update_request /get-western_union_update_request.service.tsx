import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { wuUpdateRequestResponse } from './get-western_union_update_request.interface';
import wuUpdateRequestResponseData from './get-western_union_update_request.mock';

const wuRefundRequest = async ()=> {
  if (constants.MOCK_API_RESPONSE) {
    return wuUpdateRequestResponseData;
  }
  try {
    const apiResponse: ApiResponse<wuUpdateRequestResponse> = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.get_western_union_update_request(),
      method: requestType.GET,
    });

    return apiResponse?.response;
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default wuRefundRequest;

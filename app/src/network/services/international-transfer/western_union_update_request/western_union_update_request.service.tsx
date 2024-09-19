import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { WUUpdateRequestResponse } from './western_union_update_request.interface';
import wuUpdateRequestResponseData from './western_union_update_request.mock';

const wuUpdateRequest = async (beneficiaryCode: string): Promise<WUUpdateRequestResponse | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return wuUpdateRequestResponseData;
  }

  const apiResponse: ApiResponse<WUUpdateRequestResponse> | undefined = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.western_union_update_request(beneficiaryCode),
    method: requestType.POST,
  });

  return apiResponse?.response;
};

export default wuUpdateRequest;

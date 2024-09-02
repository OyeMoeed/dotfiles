import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { wuRefundRequestResponse } from './western_union_refund_request.interface';
import wuRefundRequestResponseData from './western_union_refund_request.mock';

const wuRefundRequest = async (beneficiaryCode: string)=> {
  if (constants.MOCK_API_RESPONSE) {
    return wuRefundRequestResponseData;
  }
  try {
    const apiResponse: ApiResponse<wuRefundRequestResponse> = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.western_union_refund_request(beneficiaryCode),
      method: requestType.DELETE,
    });

    return apiResponse?.response;
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default wuRefundRequest;

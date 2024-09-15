import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import REQUEST_MANAGEMENT_URLS from '../request-management.urls';
import { UpdateRejectRequestResponseTypes } from './cancel-reject-request.interface';
import cancelRejectRequestMockResponse from './cancel-reject-request.mock';
import UpdateRequestTypes from '../update-request.types';

const cancelRejectRequestService = async (
  walletNumber: string,
  transactionId: string,
  UpdateRequestType: UpdateRequestTypes,
): Promise<UpdateRejectRequestResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return cancelRejectRequestMockResponse;
  }
  try {
    const apiResponse: UpdateRejectRequestResponseTypes = await apiCall({
      endpoint: REQUEST_MANAGEMENT_URLS.cancelRejectRequest(walletNumber, transactionId, UpdateRequestType),
      method: requestType.POST,
    });

    if (apiResponse?.successfulResponse) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default cancelRejectRequestService;

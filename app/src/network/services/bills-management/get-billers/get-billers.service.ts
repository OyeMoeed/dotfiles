import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { GetBillersResponseTypes } from './get-billers.interface';
import getBillersMockResponse from './get-billers.mock';

const getBillers = async (): Promise<GetBillersResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return getBillersMockResponse;
  }
  try {
    const apiResponse: GetBillersResponseTypes = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.get_billers,
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return apiResponse;
    }

    return { apiResponseNotOk: true, apiResponse };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getBillers;

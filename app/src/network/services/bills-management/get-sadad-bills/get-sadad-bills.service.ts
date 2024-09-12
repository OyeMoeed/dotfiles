import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import sadadBillsMock from './get-sadad-bills.mock';

const getSadadBills = async (): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = sadadBillsMock;
    return response;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.GET_BILLS,
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getSadadBills;

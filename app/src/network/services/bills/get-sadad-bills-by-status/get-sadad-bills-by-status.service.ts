import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_URLS from '../bills-urls';
import { GetSadadBillByStatusProps } from './get-sadad-bills-by-status.interface';
import sadadBillsByStatusMock from './get-sadad-bills-by-status.mock';

const getSadadBillsByStatus = async (payload: GetSadadBillByStatusProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = sadadBillsByStatusMock;
    return response;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: BILLS_URLS.GET_BILLS_BY_STATUS(payload?.walletNumber, payload?.walletNumber),
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

export default getSadadBillsByStatus;

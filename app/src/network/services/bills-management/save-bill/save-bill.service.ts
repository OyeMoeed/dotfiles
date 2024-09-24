import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { SaveBillPayloadTypes } from './save-bill.interface';
import saveBillMockResponse from './save-bill.mock';

const saveBillService = async (payload: SaveBillPayloadTypes): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return saveBillMockResponse;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.SAVE_BILL(),
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return apiResponse;
    }

    return { apiResponseNotOk: true, apiResponse };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default saveBillService;

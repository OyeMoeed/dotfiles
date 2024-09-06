import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { EditBillPayloadTypes, EditBillResponseTypes } from './edit-bill.interface';
import editBillMockResponse from './edit-bill.mock';

const editBillService = async (payload: EditBillPayloadTypes): Promise<EditBillResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return editBillMockResponse;
  }
  try {
    const apiResponse: EditBillResponseTypes = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.edit_bill(),
      method: requestType.PUT,
      payload,
    });

    if (apiResponse?.successfulResponse) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default editBillService;

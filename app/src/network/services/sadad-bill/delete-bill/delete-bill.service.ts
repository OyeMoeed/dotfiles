import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import SADAD_BILL_URLS from '../sadad-bill.urls';
import { DeleteBillRequest, DeleteBillResponse } from './delete-bill.interface';
import deleteBillMock from './delete-bill.mock';

const deleteBill = async (payload: DeleteBillRequest): Promise<ApiResponse<DeleteBillResponse>> => {
  if (constants.MOCK_API_RESPONSE) {
    return deleteBillMock;
  }
  try {
    const apiResponse = await apiCall<DeleteBillResponse>({
      endpoint: SADAD_BILL_URLS.DELETE_BILL,
      method: requestType.DELETE,
      payload,
    });

    return apiResponse;
  } catch (error) {
    return { error: error?.message || 'Unknown error' };
  }
};

export default deleteBill;

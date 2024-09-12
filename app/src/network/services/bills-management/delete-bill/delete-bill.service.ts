import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { APIResponseType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';

import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { DeleteBillMockProps, DeleteBillRequest, DeleteBillResponse } from './delete-bill.interface';
import deleteBillMock from './delete-bill.mock';

/**
 * Deletes a bill using the provided payload.
 * If MOCK_API_RESPONSE is enabled, it returns a mock response.
 *
 * @param payload - The request payload for deleting a bill.
 * @returns A promise that resolves to the response type of DeleteBillMockProps.
 */
const deleteBill = async (payload: DeleteBillRequest): Promise<DeleteBillMockProps> => {
  // Return mock response if MOCK_API_RESPONSE is enabled
  if (constants.MOCK_API_RESPONSE) {
    return deleteBillMock;
  }

  try {
    // Make API call to delete the bill
    const apiResponse = await apiCall<DeleteBillResponse>({
      endpoint: BILLS_MANAGEMENT_URLS.DELETE_BILL,
      method: requestType.DELETE,
      payload,
    });

    // Check if the API response indicates success
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }

    // Handle unsuccessful response
    return { error: 'Failed to delete bill. Please try again later.' };
  } catch (error: any) {
    // Catch any error during API call and return a detailed error message
    return { error: error?.message || 'An unknown error occurred while attempting to delete the bill.' };
  }
};

export default deleteBill;

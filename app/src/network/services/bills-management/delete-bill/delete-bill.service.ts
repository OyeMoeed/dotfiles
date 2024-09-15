import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';

import { ApiResponseStatusType } from '@app/utilities';
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

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return {
        status: apiResponse.status, // or map apiResponse to the required structure
        response: apiResponse.data,
        successfulResponse: apiResponse.status.type === ApiResponseStatusType.SUCCESS,
      } as DeleteBillMockProps;
    }
    // If apiResponse is undefined, return a default error response
    return {
      status: {
        code: 'ERROR',
        type: 'ERROR',
        desc: 'No response from server',
        sessionReference: '',
        requestReference: '',
        translation: '',
      },
      response: { billStatus: 'Unknown' }, // or provide appropriate default value
      successfulResponse: false,
    };
  } catch (error: any) {
    // Catch any error during API call and return a detailed error message
    return {
      status: {
        code: 'ERROR',
        type: 'ERROR',
        desc: error?.message || 'An unknown error occurred while attempting to delete the bill.',
        sessionReference: '',
        requestReference: '',
        translation: '',
      },
      response: { billStatus: 'Error' }, // or provide appropriate default value
      successfulResponse: false,
    };
  }
};

export default deleteBill;

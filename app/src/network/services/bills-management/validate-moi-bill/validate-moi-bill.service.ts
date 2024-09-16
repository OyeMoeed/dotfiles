import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { ValidateBillResponse, ValidateBillResponsesPayload } from './validate-moi-bill.interface';
import ValidateBillMockResponse from './validate-moi-bill.mock';

const validateBill = async (
  billerId: string,
  serviceId: string,
  payload: ValidateBillResponsesPayload,
): Promise<ValidateBillResponse | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return ValidateBillMockResponse;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.validate_bill(billerId, serviceId),
      method: requestType.POST,
      payload,
    });

    return apiResponse as ValidateBillResponse;
  } 
};

export default validateBill;

import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { PrepareMoiBillPayload, PrepareMoiBillResponse } from './prepare-moi-bill.interface';
import PrepareMoiBillMockResponse from './prepare-moi-bill.mock';

const prepareMoiBill = async (
  paymentType: string,
  payload: PrepareMoiBillPayload,
): Promise<PrepareMoiBillResponse | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return PrepareMoiBillMockResponse;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.prepare_bill(paymentType),
      method: requestType.POST,
      payload,
    });

    return apiResponse as PrepareMoiBillResponse;
  } 
};

export default prepareMoiBill;

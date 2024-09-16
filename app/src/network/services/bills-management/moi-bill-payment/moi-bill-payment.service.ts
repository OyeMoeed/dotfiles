import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { MoiBillMockPayload, MoiBillResponse } from './moi-bill-payment.interface';
import MoiBillMockResponse from './moi-bill-payment.mock';

const MoiBillPayment = async (
  payload: MoiBillMockPayload,
): Promise<MoiBillResponse | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return MoiBillMockResponse;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.pay_moi_bill(),
      method: requestType.POST,
      payload,
    });

    return apiResponse as MoiBillResponse;
  } 
};

export default MoiBillPayment;

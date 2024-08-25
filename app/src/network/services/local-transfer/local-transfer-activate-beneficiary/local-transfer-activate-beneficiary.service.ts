import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import {
  ActivateBeneficiaryPayload,
  ActivateBeneficiaryResponse,
} from './local-transfer-activate-beneficiary.interface';

const activateBeneficiary = async (payload: ActivateBeneficiaryPayload): Promise<ActivateBeneficiaryResponse> => {
  try {
    const apiResponse = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.activate_beneficiary(),
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

export default activateBeneficiary;

import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { ActivateBeneficiaryPayload } from './local-transfer-activate-beneficiary.interface';

const activateBeneficiary = async (payload: ActivateBeneficiaryPayload): Promise<unknown> => {
  try {
    const apiResponse = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.ACTIVATE_BENEFICIARY(),
      method: requestType.PUT,
      payload,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default activateBeneficiary;

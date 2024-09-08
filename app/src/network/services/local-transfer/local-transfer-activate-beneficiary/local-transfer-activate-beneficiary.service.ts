import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import {
  ActivateBeneficiaryPayload,
  ActivateBeneficiaryResponse,
} from './local-transfer-activate-beneficiary.interface';
import activateBeneficiariesData from './local-transfer-activate-beneficiary.mock';

const activateLocalBeneficiary = async (payload: ActivateBeneficiaryPayload): Promise<ActivateBeneficiaryResponse> => {
  try {
    if (constants.MOCK_API_RESPONSE) {
      return activateBeneficiariesData;
    }
    const apiResponse = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.activate_beneficiary(),
      method: requestType.PUT,
      payload,
    });

    return apiResponse;
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default activateLocalBeneficiary;

import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import {
  ActivateBeneficiaryPayload,
  ActivateBeneficiaryResponse,
} from './activate-international-beneficiary.interface';
import activateBeneficiariesData from './activate-international-beneficiary.mock';

const activateInternationalBeneficiary = async (
  payload: ActivateBeneficiaryPayload,
): Promise<ActivateBeneficiaryResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    return activateBeneficiariesData;
  }
  const apiResponse = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.activate_beneficiary,
    method: requestType.PUT,
    payload,
  });

  return apiResponse;
};

export default activateInternationalBeneficiary;

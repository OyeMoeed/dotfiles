import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { editBeneficiaryPayload, editBeneficiaryResponse } from './edit-international-beneficiary.interface';
import editBeneficiariesData from './edit-international-beneficiary.mock';

const editInternationalBeneficiary = async (
  beneficiaryCode: string,
  payload: editBeneficiaryPayload,
): Promise<editBeneficiaryResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    return editBeneficiariesData;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.edit_beneficiary(beneficiaryCode),
      method: requestType.PUT,
      payload,
    });

    return apiResponse;
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default editInternationalBeneficiary;

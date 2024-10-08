import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { editBeneficiaryPayload, editBeneficiaryResponse } from './edit-international-beneficiary.interface';
import editBeneficiariesData from './edit-international-beneficiary.mock';
import { ApiResponse } from '../../services.interface';

const editInternationalBeneficiary = async (
  beneficiaryCode: string,
  payload: editBeneficiaryPayload,
): Promise<ApiResponse<editBeneficiaryResponse>> => {
  if (constants.MOCK_API_RESPONSE) {
    return editBeneficiariesData as ApiResponse<editBeneficiaryResponse>;
  }

  const apiResponse: ApiResponse<editBeneficiaryResponse> = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.edit_beneficiary(beneficiaryCode),
    method: requestType.PUT,
    payload,
  });

  return apiResponse;
};

export default editInternationalBeneficiary;

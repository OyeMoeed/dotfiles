import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { editBeneficiaryPayload, editBeneficiaryResponse } from './edit-beneficiary.interface';
import localTransferEditBeneficiaryMock from './edit-beneficiary.mock';

const editLocalTransferBeneficiary = async (
  beneficiaryCode: string,
  payload: editBeneficiaryPayload,
): Promise<editBeneficiaryResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    return localTransferEditBeneficiaryMock;
  }
  try {
    const apiResponse: ApiResponse<editBeneficiaryResponse> = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.edit_local_transfer_beneficiary(beneficiaryCode),
      method: requestType.PUT,
      payload,
    });
console.log('apiResponse', apiResponse);

    return apiResponse;
  } catch (error) {
    const { response } = error;
    return response || 'Unknown error';
  }
};

export default editLocalTransferBeneficiary;

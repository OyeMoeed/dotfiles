import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { EditBeneficiaryResponse, editBeneficiaryPayload } from './edit-beneficiary.interface';
import localTransferEditBeneficiaryMock from './edit-beneficiary.mock';

const editLocalTransferBeneficiary = async (
  beneficiaryCode: string,
  payload: editBeneficiaryPayload,
): Promise<EditBeneficiaryResponse | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return localTransferEditBeneficiaryMock;
  }

  const apiResponse: ApiResponse<EditBeneficiaryResponse> | undefined = await apiCall({
    endpoint: LOCAL_TRANSFERS_URLS.edit_local_transfer_beneficiary(beneficiaryCode),
    method: requestType.PUT,
    payload,
  });

  return apiResponse;
};

export default editLocalTransferBeneficiary;

import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { LocalTransferEditBeneficiaryMockProps, LocalTransferEditBeneficiaryReq } from './edit-beneficiary.interface';
import localTransferEditBeneficiaryMock from './edit-beneficiary.mock';

const editLocalTransferBeneficiary = async (
  beneficiaryCode: string,
  payload: LocalTransferEditBeneficiaryReq,
): Promise<LocalTransferEditBeneficiaryMockProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return localTransferEditBeneficiaryMock;
  }
  try {
    const apiResponse: ApiResponse<LocalTransferEditBeneficiaryMockProps> = await apiCall({
      endpoint: `${LOCAL_TRANSFERS_URLS.edit_local_transfer_beneficiary()}${beneficiaryCode}`,
      method: requestType.PUT,
      payload,
    });
    if (apiResponse?.response?.ok) {
      return apiResponse?.response;
    }
    return { apiResponseNotOk: true, apiResponse };
  } catch (error) {
    const { response } = error;
    return response || 'Unknown error';
  }
};

export default editLocalTransferBeneficiary;

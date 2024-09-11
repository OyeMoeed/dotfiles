import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import LocalTransferDeleteBeneficiaryMockProps from './delete-beneficiary.interface';
import localTransferDeleteBeneficiaryMock from './delete-beneficiary.mock';

const deleteLocalTransferBeneficiary = async (
  beneficiaryCode: string,
): Promise<LocalTransferDeleteBeneficiaryMockProps | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return localTransferDeleteBeneficiaryMock;
  }

  const apiResponse: ApiResponse<LocalTransferDeleteBeneficiaryMockProps> | undefined = await apiCall({
    endpoint: LOCAL_TRANSFERS_URLS.delete_local_transfer_beneficiary(beneficiaryCode),
    method: requestType.DELETE,
  });
  return apiResponse;
};

export default deleteLocalTransferBeneficiary;

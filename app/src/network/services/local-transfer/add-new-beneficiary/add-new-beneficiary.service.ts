import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { BeneficiaryInfo, LocalTransferAddBeneficiaryMockProps } from './add-new-beneficiary.interface';
import localTransferAddBeneficiaryMock from './add-new-beneficiary.mock';

const addLocalTransferBeneficiary = async (
  payload: BeneficiaryInfo,
): Promise<LocalTransferAddBeneficiaryMockProps | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return localTransferAddBeneficiaryMock;
  }

  const apiResponse: ApiResponse<LocalTransferAddBeneficiaryMockProps> | undefined = await apiCall({
    endpoint: LOCAL_TRANSFERS_URLS.add_local_transfer_beneficiary(),
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export default addLocalTransferBeneficiary;

import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { BeneficiaryInfo, LocalTransferAddBeneficiaryMockProps } from './add-new-beneficiary.interface';

const addLocalTransferBeneficiary = async (payload: BeneficiaryInfo): Promise<LocalTransferAddBeneficiaryMockProps> => {
  try {
    const apiResponse: ApiResponse<LocalTransferAddBeneficiaryMockProps> = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.add_local_transfer_beneficiary(),
      method: requestType.POST,
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

export default addLocalTransferBeneficiary;

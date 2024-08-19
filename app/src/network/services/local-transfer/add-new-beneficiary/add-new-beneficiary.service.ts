import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { IApiStatus } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { BeneficiaryInfo } from './add-new-beneficiary.interface';

const addLocalTransferBeneficiary = async (payload: BeneficiaryInfo): Promise<unknown> => {
  try {
    const apiResponse = await apiCall<unknown>({
      endpoint: LOCAL_TRANSFERS_URLS.ADD_LOCAL_TRANSFER_BENEFICIARY(),
      method: requestType.POST,
      payload,
    });
    return apiResponse;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

export default addLocalTransferBeneficiary;

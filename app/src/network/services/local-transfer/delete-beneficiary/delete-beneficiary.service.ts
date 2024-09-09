import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { IApiStatus } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localTransferDeleteBeneficiaryMock from './delete-beneficiary.mock';

const deleteLocalTransferBeneficiary = async (beneficiaryCode: string): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return localTransferDeleteBeneficiaryMock;
  }
  try {
    const apiResponse = await apiCall<unknown>({
      endpoint: LOCAL_TRANSFERS_URLS.delete_local_transfer_beneficiary(beneficiaryCode),
      method: requestType.DELETE,
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

export default deleteLocalTransferBeneficiary;

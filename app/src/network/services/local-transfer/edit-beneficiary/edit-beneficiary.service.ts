import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { IApiStatus } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localTransferEditBeneficiaryMock from './edit-beneficiary';
import { LocalTransferEditBeneficiaryReq } from './edit-beneficiary.interface';

const editLocalTransferBeneficiary = async (
  beneficiaryCode: string,
  payload: LocalTransferEditBeneficiaryReq,
): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return localTransferEditBeneficiaryMock;
  }
  try {
    const apiResponse = await apiCall<unknown>({
      endpoint: `${LOCAL_TRANSFERS_URLS.edit_local_transfer_beneficiary()}${beneficiaryCode}`,
      method: requestType.PUT,
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

export default editLocalTransferBeneficiary;

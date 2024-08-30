import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AEAddBeneficiaryProps, AEAddBeneficiaryReq } from './ae-add-beneficiary.interface';
import aeAddBeneficiaryMock from './ae-add-beneficiary.mock';

const addAEBeneficiary = async (payload: AEAddBeneficiaryReq): Promise<AEAddBeneficiaryProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return aeAddBeneficiaryMock;
  }
  try {
    const apiResponse: ApiResponse<AEAddBeneficiaryProps> = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.alinma_express(),
      method: requestType.POST,
      payload,
    });
    if (apiResponse?.response?.ok) {
      return apiResponse?.response;
    }
    return { apiResponseNotOk: true, ...apiResponse };
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default addAEBeneficiary;

import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AEAddBeneficiaryProps, AEAddBeneficiaryReq } from './ae-add-beneficiary.interface';
import aeAddBeneficiaryMock from './ae-add-beneficiary.mock';

const addAEBeneficiary = async (payload: AEAddBeneficiaryReq): Promise<AEAddBeneficiaryProps | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return aeAddBeneficiaryMock;
  }
  const apiResponse: ApiResponse<AEAddBeneficiaryProps> | undefined = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.alinma_express,
    method: requestType.POST,
    payload,
  });
  return apiResponse?.response;
};

export default addAEBeneficiary;

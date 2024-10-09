import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { BeneficiaryDetailsRes, AEAddBeneficiaryReq } from './ae-add-beneficiary.interface';
import aeAddBeneficiaryMock from './ae-add-beneficiary.mock';

const addAEBeneficiary = async (
  payload: AEAddBeneficiaryReq,
): Promise<ApiResponse<BeneficiaryDetailsRes> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return aeAddBeneficiaryMock;
  }
  const apiResponse: ApiResponse<BeneficiaryDetailsRes> | undefined = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.get_alinma_express_beneficiaries,
    method: requestType.POST,
    payload,
  });
  return apiResponse;
};

export default addAEBeneficiary;

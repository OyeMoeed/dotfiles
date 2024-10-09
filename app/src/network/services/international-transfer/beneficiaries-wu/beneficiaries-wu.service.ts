import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AddWUBeneficiaryReq, BeneficiaryDetailsRes } from './beneficiaries-wu.interface';
import addWUBeneficiaryMock from './beneficiaries-wu.mock';

const addWUbeneficiary = async (
  payload: AddWUBeneficiaryReq,
): Promise<ApiResponse<BeneficiaryDetailsRes> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return addWUBeneficiaryMock;
  }
  const apiResponse: ApiResponse<BeneficiaryDetailsRes> | undefined = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.post_beneficiaries_wu(),
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export default addWUbeneficiary;

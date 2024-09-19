import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { ValidateWUTransferPayload, ValidateWUTransferProps } from './wu-transfer-validate.interface';
import wuValidateTransferMock from './wu-transfer-validate.mock';

const wuValidateTransfer = async (
  payload: ValidateWUTransferPayload,
  beneficiaryCode: string,
): Promise<ValidateWUTransferProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return wuValidateTransferMock;
  }
  try {
    const apiResponse: ApiResponse<ValidateWUTransferProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/validate`,
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.response?.ok) {
      return apiResponse.response;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default wuValidateTransfer;

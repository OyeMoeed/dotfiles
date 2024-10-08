import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AlinmaExpressResponse } from './alinma-express-beneficiary.interface';
import alinmaExpressBeneficiariesData from './alinma-express-beneficiary.mock';

const getAlinmaExpressBeneficiaries = async (): Promise<AlinmaExpressResponse | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return alinmaExpressBeneficiariesData?.response;
  }

  const apiResponse: ApiResponse<AlinmaExpressResponse> = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.get_alinma_express_beneficiaries(),
    method: requestType.GET,
  });

  return apiResponse?.response;
};

export default getAlinmaExpressBeneficiaries;

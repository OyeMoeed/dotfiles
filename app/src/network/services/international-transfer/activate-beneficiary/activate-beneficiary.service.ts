import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import AlinmaExpressBeneficiariesProps from './alinma-express-beneficiary.interface';
import alinmaExpressBeneficiariesData from './alinma-express-beneficiary.mock';

const getAlinmaExpressBeneficiaries = async (): Promise<AlinmaExpressBeneficiariesProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return alinmaExpressBeneficiariesData;
  }
  const apiResponse: ApiResponse<AlinmaExpressBeneficiariesProps> = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.get_alinma_express_beneficiaries,
    method: requestType.GET,
  });
  return apiResponse;
};

export default getAlinmaExpressBeneficiaries;

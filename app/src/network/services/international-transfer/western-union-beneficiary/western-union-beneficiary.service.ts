import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import WesternUnionBeneficiariesProps from './western-union-beneficiary.interface';
import westernUnionBeneficiariesData from './western-union-beneficiary.mock';

const getWesternUnionBeneficiaries = async (): Promise<WesternUnionBeneficiariesProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return westernUnionBeneficiariesData;
  }
  try {
    const apiResponse: ApiResponse<WesternUnionBeneficiariesProps> = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries(),
      method: requestType.GET,
    });

    if (apiResponse?.response?.ok) {
      return apiResponse?.response;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getWesternUnionBeneficiaries;

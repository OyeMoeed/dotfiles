import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { BeneficiaryCurrenciesReq, WUBeneficiaryCurrenciesProps } from './wu-beneficiary-currencies.interface';
import wuBeneficiaryCurrenciesMock from './wu-beneficiary-currencies.mock';

const getWUBeneficiaryCurrencies = async (payload: BeneficiaryCurrenciesReq): Promise<WUBeneficiaryCurrenciesProps> => {
  const { countryCode } = payload;
  if (constants.MOCK_API_RESPONSE) {
    return wuBeneficiaryCurrenciesMock;
  }
  try {
    const apiResponse: ApiResponse<WUBeneficiaryCurrenciesProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries_countries()}/${countryCode || 'SA'}/currencies`,
      method: requestType.GET,
    });

    if (apiResponse?.successfulResponse) {
      return apiResponse;
    }
    return { apiResponseNotOk: true, ...apiResponse?.response };
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default getWUBeneficiaryCurrencies;

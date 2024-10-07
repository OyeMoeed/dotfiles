import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { BeneficiaryCurrenciesReq, WUCurrenciesResponseInterface } from './wu-beneficiary-currencies.interface';
import wuBeneficiaryCurrenciesMock from './wu-beneficiary-currencies.mock';

const getWUBeneficiaryCurrencies = async (
  payload: BeneficiaryCurrenciesReq,
): Promise<ApiResponse<WUCurrenciesResponseInterface> | undefined> => {
  const { countryCode } = payload;
  if (constants.MOCK_API_RESPONSE) {
    return wuBeneficiaryCurrenciesMock;
  }
  const apiResponse: ApiResponse<WUCurrenciesResponseInterface> | undefined = await apiCall({
    endpoint: `${INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries_countries()}/${countryCode}/currencies`,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getWUBeneficiaryCurrencies;

import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AEBeneficiaryCountriesParam, AECountriesResponseInterface } from './ae-beneficiary-countries.interface';
import aeBeneficiaryCountriesMock from './ae-beneficiary-countries.mock';
import { ApiResponse } from '../../services.interface';

const getAEBeneficiaryCountries = async (
  payload: AEBeneficiaryCountriesParam,
): Promise<ApiResponse<AECountriesResponseInterface> | undefined> => {
  const { alinmaExpressType } = payload;
  if (constants.MOCK_API_RESPONSE) {
    return aeBeneficiaryCountriesMock;
  }
  const apiResponse: ApiResponse<AECountriesResponseInterface> | undefined = await apiCall({
    endpoint: `${INTERNATIONAL_TRANSFERS_URLS.alinma_express}/alinma-express-types/${alinmaExpressType}/countries`,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getAEBeneficiaryCountries;

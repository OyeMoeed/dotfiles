import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AEBeneficiaryCountriesParam, AEBeneficiaryCountriesProps } from './ae-beneficiary-countries.interface';
import aeBeneficiaryCountriesMock from './ae-beneficiary-countries.mock';

const getAEBeneficiaryCountries = async (
  payload: AEBeneficiaryCountriesParam,
): Promise<AEBeneficiaryCountriesProps> => {
  const { alinmaExpressType } = payload;
  if (constants.MOCK_API_RESPONSE) {
    return aeBeneficiaryCountriesMock;
  }
  try {
    const apiResponse: ApiResponse<AEBeneficiaryCountriesProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.alinma_express()}/alinma-express-types/${alinmaExpressType}/countries`,
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

export default getAEBeneficiaryCountries;

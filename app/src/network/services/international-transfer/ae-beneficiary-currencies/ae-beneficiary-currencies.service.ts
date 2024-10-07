import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AECurrenciesParams, AECurrenciesInterface } from './ae-beneficiary-currencies.interface';
import aeBeneficiaryCountriesMock from './ae-beneficiary-currencies.mock';
import { ApiResponse } from '../../services.interface';

const getAECurrencies = async (
  payload: AECurrenciesParams,
): Promise<ApiResponse<AECurrenciesInterface> | undefined> => {
  const { alinmaExpressType, bank } = payload;
  if (constants.MOCK_API_RESPONSE) {
    return aeBeneficiaryCountriesMock;
  }
  const apiResponse: ApiResponse<AECurrenciesInterface> | undefined = await apiCall({
    endpoint: `${INTERNATIONAL_TRANSFERS_URLS.alinma_express}/remittance-types/${alinmaExpressType}/correpondant-banks/${bank}/currencies`,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getAECurrencies;

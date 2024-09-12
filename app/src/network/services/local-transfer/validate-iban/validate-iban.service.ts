import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { ValidateIBANResponse, ValidateIBANResponseReq } from './validate-iban.interface';
import ibanValidityMock from './validate-iban.mock';

const validateIBAN = async (params: ValidateIBANResponseReq): Promise<ValidateIBANResponse | undefined> => {
  const { countryCode, iban }: ValidateIBANResponseReq = params;
  const paramsUrl = `${iban}?country-code=${countryCode}`;
  if (constants.MOCK_API_RESPONSE) {
    return ibanValidityMock;
  }

  const apiResponse: ApiResponse<ValidateIBANResponse> | undefined = await apiCall({
    endpoint: `${LOCAL_TRANSFERS_URLS.validateIBAN()}${paramsUrl}`,
    method: requestType.GET,
  });
  return apiResponse?.response;
};

export default validateIBAN;
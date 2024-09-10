import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { ValidateIBANResponse, ValidateIBANResponseReq } from './validate-iban.interface';
import ibanValidityMock from './validate-iban.mock';

const validateIBAN = async (params: ValidateIBANResponseReq): Promise<ValidateIBANResponse | unknown> => {
  const { countryCode, iban }: ValidateIBANResponseReq = params;
  const paramsUrl = `${iban}?country-code=${countryCode}`;
  if (constants.MOCK_API_RESPONSE) {
    return ibanValidityMock;
  }

  const apiResponse = await apiCall({
    endpoint: `${LOCAL_TRANSFERS_URLS.validateIBAN()}${paramsUrl}`,
    method: requestType.GET,
  });

  return apiResponse;
};

export default validateIBAN;

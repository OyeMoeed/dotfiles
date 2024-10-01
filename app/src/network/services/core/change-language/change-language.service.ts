import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { ChangeLangPayloadProps } from './change-language.interface';
import changeLanguageMock from './change-language.mock';

const changeLanguage = async (payload: ChangeLangPayloadProps): Promise<object | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return changeLanguageMock;
  }

  const apiResponse = await apiCall({
    endpoint: CORE_URLS.CHANGE_LANGUAGE(payload?.walletNumber),
    method: requestType.POST,
    payload: payload?.body,
    headers: {
      hide_error_response: true,
    },
  });

  return apiResponse;
};

export default changeLanguage;

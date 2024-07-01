import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { changeLanguagePayloadProps } from './change-language.interface';
import changeLanguageMock from './change-language.mock';

const changeLanguage = async (payload: changeLanguagePayloadProps): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return changeLanguageMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.CHANGE_LANGUAGE,
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true, apiResponse };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default changeLanguage;

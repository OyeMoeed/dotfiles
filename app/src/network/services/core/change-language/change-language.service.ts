import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { ChangeLangPayloadProps } from './change-language.interface';
import changeLanguageMock from './change-language.mock';

const changeLanguage = async (payload: ChangeLangPayloadProps): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return changeLanguageMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.CHANGE_LANGUAGE(payload?.walletNumber),
      method: requestType.POST,
      payload: payload?.body,
    });

    if (apiResponse?.status?.type === "SUCCESS") {
      return apiResponse;
    }
    
    return { apiResponseNotOk: true, apiResponse };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default changeLanguage;

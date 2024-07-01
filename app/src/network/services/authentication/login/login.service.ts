import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import AUTHENTICATION_URLS from '../authentication.urls';
import { LoginUserPayloadProps } from './login.interface';
import loginMock from './login.mock';

const loginUser = async (payload: LoginUserPayloadProps): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return loginMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: AUTHENTICATION_URLS.LOGIN,
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default loginUser;

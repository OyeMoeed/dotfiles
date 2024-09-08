import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import AUTHENTICATION_URLS from '../authentication.urls';
import { LoginViaPasscodeProps } from './login-via-passcode.interface';
import loginViaPasscodeMock from './login-via-passcode.mock';

const loginViaPasscode = async (payload: LoginViaPasscodeProps): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return loginViaPasscodeMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: AUTHENTICATION_URLS.LOGIN_VIA_PASSCODE,
      method: requestType.POST,
      payload,
      headers: {
        'Api-Version': 'v2',
      },
    });
    if (apiResponse?.status.type == 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true, apiResponse: apiResponse };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default loginViaPasscode;

import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import AUTHENTICATION_URLS from '../authentication.urls';
import { LoginViaPasscodeProps } from './login-via-passcode.interface';
import loginViaPasscodeMock from './login-via-passcode.mock';

const loginViaPasscode = async (payload: LoginViaPasscodeProps): Promise<object | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return loginViaPasscodeMock;
  }

  const apiResponse = await apiCall({
    endpoint: AUTHENTICATION_URLS.LOGIN_VIA_PASSCODE,
    method: requestType.POST,
    payload,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Api-Version': 'v2',
    },
  });
  return apiResponse;
};

export default loginViaPasscode;

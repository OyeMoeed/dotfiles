import constantsNetwork from '@app/network/constants';
import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import AUTHENTICATION_URLS from '../authentication.urls';
import loginViaPasscodeMock from './login-via-passcode.mock';
import { OtpVerificationProps } from '../otp-verification/otp-verification.interface';

const loginViaPasscode = async (payload: OtpVerificationProps): Promise<object | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return loginViaPasscodeMock;
  }

  const apiResponse = await apiCall({
    endpoint: AUTHENTICATION_URLS.LOGIN_VIA_PASSCODE,
    method: requestType.POST,
    payload,
    headers: {
      [constantsNetwork.API_VERSION_NAME]: 'v2',
    },
  });
  return apiResponse;
};

export default loginViaPasscode;

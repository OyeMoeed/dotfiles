import constantsNetwork from '@app/network/constants';
import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import AUTHENTICATION_URLS from '../authentication.urls';
import { LoginResponseDetails, LoginUserPayloadProps } from './login.interface';
import loginMock from './login.mock';

type LoginUserResponse = ApiResponse<LoginResponseDetails> | undefined;

const loginUser = async (payload: LoginUserPayloadProps): Promise<LoginUserResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    return loginMock;
  }

  const apiResponse = await apiCall<LoginResponseDetails>({
    endpoint: AUTHENTICATION_URLS.LOGIN,
    method: requestType.POST,
    payload,
    headers: {
      [constantsNetwork.API_VERSION_NAME]: 'v2',
    },
  });
  return apiResponse;
};

export default loginUser;

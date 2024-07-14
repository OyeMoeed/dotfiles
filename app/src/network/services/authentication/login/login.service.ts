import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiError, ApiResponse, ApiResponseNotOk } from '../../services.interface';
import AUTHENTICATION_URLS from '../authentication.urls';
import { LoginApiMockResponseProps, LoginUserPayloadProps } from './login.interface';
import loginMock from './login.mock';

type LoginUserResponse = ApiResponse<LoginApiMockResponseProps> | ApiResponseNotOk | ApiError;

const loginUser = async (payload: LoginUserPayloadProps): Promise<LoginUserResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    return loginMock;
  }
  try {
    const apiResponse = await apiCall<LoginApiMockResponseProps>({
      endpoint: AUTHENTICATION_URLS.LOGIN,
      method: requestType.POST,
      payload,
      headers: {
        'Api-Version': 'v2',
      },
    });

    if (apiResponse?.ok) {
      return apiResponse; //or maybe return apiResponse.data
    }

    return { apiResponseNotOk: true };
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return { error: errorMessage };
  }
};

export default loginUser;

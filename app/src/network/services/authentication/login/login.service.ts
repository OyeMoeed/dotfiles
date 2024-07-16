import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '../../services.interface';
import AUTHENTICATION_URLS from '../authentication.urls';
import {  LoginResponseDetails, LoginUserPayloadProps } from './login.interface';
import loginMock from './login.mock';

type LoginUserResponse = ApiResponse<LoginResponseDetails> 

const loginUser = async (payload: LoginUserPayloadProps): Promise<LoginUserResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    return loginMock;
  }
  try {
    const apiResponse = await apiCall<LoginResponseDetails>({
      endpoint: AUTHENTICATION_URLS.LOGIN,
      method: requestType.POST,
      payload,
      headers: {
        'Api-Version': 'v2',
      },
    });
    
    return apiResponse;

  } catch (error: any) {
    const status:IApiStatus = {
      code: 'NETWORK_ERROR',
      type: "ERROR" ,
      desc: error.message || 'Unknown network error',
    };
    return { 
      status,
      successfulResponse: false,
    };
  }
};

export default loginUser;
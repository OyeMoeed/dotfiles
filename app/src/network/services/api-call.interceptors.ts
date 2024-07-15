import { AxiosResponse } from 'axios';
import { ApiResponse, IApiStatus } from './services.interface';

const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> => {
  const { status, successfulResponse, authentication, response: responseData } = response.data;

  if (status.type === 'ERROR' || !successfulResponse) {
    return {
      status,
      successfulResponse: false,
    };
  }

  return {
    status,
    response: responseData,
    successfulResponse: true,
    authentication,
  };
};

const handleApiError = (error: any): ApiResponse<any> => {
  const status: IApiStatus = error.response?.data?.status || {
    code: 'NETWORK_ERROR',
    type: 'ERROR',
    desc: error.message || 'Unknown network error',
  };

  return {
    status,
    successfulResponse: false,
  };
};

export { handleApiError, handleApiResponse };

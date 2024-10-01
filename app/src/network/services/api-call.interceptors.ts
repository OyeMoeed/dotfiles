import { AxiosResponse } from 'axios';
import { ApiResponse, IApiStatus } from './services.interface';

const handleApiResponse = (response: AxiosResponse): ApiResponse<any> => {
  const { status, authentication, response: responseData } = response.data || {};

  return {
    status,
    response: responseData,
    successfulResponse: true,
    authentication,
    headers: response.headers,
  };
};

const mapApiError = (error: any): ApiResponse<any> => {
  const result = error?.response?.data || error?.data;
  const status: IApiStatus = {
    code: result?.status?.code || 'NETWORK_ERROR',
    type: result?.status?.type || 'ERROR',
    desc: result?.status?.translation || 'ERROR.SOMETHING_WENT_WRONG',
  };

  return {
    status,
    successfulResponse: false,
  };
};

export { mapApiError, handleApiResponse };

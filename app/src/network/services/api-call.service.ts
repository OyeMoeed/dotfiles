import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosClient from '../client';
import { ApiResponse } from './services.interface';
import { handleApiResponse } from './api-call.interceptors';
import onResquestFulfilled from '../interceptors/request';
import { onResponseFulfilled, onResponseReject } from '../interceptors/response';
import { handleAxiosError, isErrorResponse } from '../utilities/error-handling-helper';

interface ApiCallParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: any;
  headers?: any;
  baseURL?: string;
}

/* register interceptors here to avoid cyclic import error */
axiosClient.interceptors.request.use(onResquestFulfilled);
axiosClient.interceptors.response.use(onResponseFulfilled, onResponseReject);

const apiCall = async <T>({
  endpoint,
  method,
  payload,
  headers = {},
  baseURL = undefined,
}: ApiCallParams): Promise<ApiResponse<T> | undefined> => {
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers: {
      ...headers,
    },
    data: payload,
  };
  if (baseURL) config.baseURL = baseURL;
  if (headers?.hide_error_response) {
    axiosClient.defaults.headers.x_hide_error_response = true;
  }

  try {
    const response: AxiosResponse<T> = await axiosClient(config);
    if (isErrorResponse(response)) {
      await handleAxiosError(response);
      return undefined;
    }
    return handleApiResponse(response);
  } catch (error: any) {
    await handleAxiosError(error);
  }
  return undefined;
};

export default apiCall;

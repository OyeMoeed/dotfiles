import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosClient from '../client';
import { ApiResponse } from './services.interface';
import { handleApiError, handleApiResponse } from './api-call.interceptors';

interface ApiCallParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: any;
  headers?: any;
  baseURL?: string;
}

const apiCall = async <T>({
  endpoint,
  method,
  payload,
  headers = {},
  baseURL = undefined,
}: ApiCallParams): Promise<ApiResponse<T>> => {
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers: {
      ...headers,
    },
    data: payload,
  };
  baseURL && (config.baseURL = baseURL);

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient(config);
    return handleApiResponse<T>(response);
  } catch (error: any) {
    return handleApiError(error);
  }
};

export default apiCall;

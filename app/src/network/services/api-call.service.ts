/* eslint-disable no-console */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosClient from '../client';
import { ApiResponse } from './services.interface';
import { handleApiError, handleApiResponse } from './api-call.interceptors';

interface ApiCallParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: any;
  headers?: any;
}

const apiCall = async <T>({ endpoint, method, payload, headers = {} }: ApiCallParams): Promise<ApiResponse<T>> => {
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers: {
      ...headers,
    },
    data: payload,
  };

  try {
    console.log('===============================');
    console.log(config);
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient(config);
    console.log(response?.data);
    console.log('===============================');

    return handleApiResponse<T>(response);
  } catch (error: any) {
    return handleApiError(error);
  }
};

export default apiCall;

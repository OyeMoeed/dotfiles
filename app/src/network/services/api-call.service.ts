import axiosClient from '../client';
import { AxiosRequestConfig } from 'axios';

interface ApiCallParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: any;
  headers?: any;
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
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
    const response = await axiosClient(config);
    return {
      ok: true,
      data: response.data,
      headers: response.headers,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message || 'Unknown error',
    };
  }
};

export default apiCall;
import axios, { AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

const BASE_URL = Config.BASE_URL; // Set baseurl from config

interface ApiResponse<T> {
  data: T;
}

interface ApiCallParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: any;
  headers?: Record<string, string>;
}

const apiCall = async <T>({ endpoint, method, payload, headers }: ApiCallParams): Promise<ApiResponse<T>> => {
  try {
    const config: AxiosRequestConfig = {
      method: method,
      url: `${BASE_URL}/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: payload,
    };

    const response = await axios(config);

    if (response.status >= 200 && response.status < 300) {
      return { data: response.data as T };
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default apiCall;

import { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, RawAxiosRequestHeaders } from 'axios';
import Config from 'react-native-config';
import axios from '../axios-client';
import { ParsedError, ParsedSuccess } from '../interceptors/response-types';
import requestType from '../request-types.network';
import { handleResponse } from '../utilities/network-helper.util';

const { BASE_URL} = Config; // Set baseurl from config

interface ApiCallParams {
  endpoint: string;
  module?: string;
  method: requestType;
  payload?: any;
  headers?:
    | (RawAxiosRequestHeaders & AxiosRequestHeaders)
    | Record<string, AxiosHeaders | string | string[] | number | boolean | null>;
}

const apiCall = <T>({
  endpoint,
  module = '',
  method,
  payload,
  headers,
}: ApiCallParams): Promise<ParsedSuccess<T> | ParsedError> => {
  const config: AxiosRequestConfig = {
    method,
    url: module ? `${BASE_URL}/${module}/${endpoint}` : `${BASE_URL}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json,text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'ar',
      'Api-Version': 'v1',
      App_version: '2.0.0',
      ...headers,
    },
    data: payload,
  };
  console.log('Anwar XXLog \n', config.url);

  return handleResponse(axios(config));
};

export default apiCall;

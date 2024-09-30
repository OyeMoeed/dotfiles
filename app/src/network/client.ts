import axios from 'axios';
import Config from 'react-native-config';
import { getDefaultAxiosHeaders } from './utilities';

const { BASE_URL, REQUEST_TIMEOUT } = Config;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: Number(REQUEST_TIMEOUT),
  headers: getDefaultAxiosHeaders(),
});

export const setToken = (token: string | undefined) => {
  axiosClient.defaults.headers.common.Authorization = token;
};

export const setBaseURL = (baseURL: string) => {
  axiosClient.defaults.baseURL = baseURL;
};

export const setHeadersLang = (langKey: string) => {
  axiosClient.defaults.headers['Accept-Language'] = langKey;
};

export default axiosClient;

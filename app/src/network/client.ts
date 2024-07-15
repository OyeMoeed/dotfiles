import axios from 'axios';
import { I18nManager } from 'react-native';
import Config from 'react-native-config';

const { BASE_URL, REQUEST_TIMEOUT } = Config;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: Number(REQUEST_TIMEOUT),

});

axiosClient.interceptors.request.use(config => {
  const abortController = new AbortController();
  config.signal = abortController.signal;

  if (config.headers) {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Api-Version'] = 'v1';
    config.headers['App_version'] = '2.0.0';
    config.headers['Accept-Language'] =  I18nManager.isRTL ? 'ar' : 'en'
  }

  setTimeout(() => {
    if (!abortController.signal.aborted) {
      abortController.abort();
    }
  }, Number(REQUEST_TIMEOUT));
  return config;
});

export const setToken = (token: string | undefined) => {
  axiosClient.defaults.headers.common.Authorization = token;
};

export const setHeadersLang = (langKey: string) => {
  axiosClient.defaults.headers['Accept-Language'] = langKey;
};

export default axiosClient;
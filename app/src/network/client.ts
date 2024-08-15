import { hideAlert, showAlert } from '@app/store/slices/alert-slice';
import { store } from '@app/store/store';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { I18nManager } from 'react-native';
import Config from 'react-native-config';
import { onResponseFulfilled, onResponseReject } from './interceptors/response';
const { BASE_URL, REQUEST_TIMEOUT } = Config;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: Number(REQUEST_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
    'api-version': 'v1',
    app_version: '2.0.0',
    'Accept-Language': I18nManager.isRTL ? 'ar' : 'en',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    store.dispatch(showAlert());
  } else {
    store.dispatch(hideAlert());
  }
  const abortController = new AbortController();
  config.signal = abortController.signal;

  setTimeout(() => {
    if (!abortController.signal.aborted) {
      abortController.abort();
    }
  }, Number(REQUEST_TIMEOUT));
  return config;
});



axiosClient.interceptors.response.use(onResponseFulfilled, onResponseReject);

export const setToken = (token: string | undefined) => {
  axiosClient.defaults.headers.common.Authorization = token;
};

export const setHeadersLang = (langKey: string) => {
  axiosClient.defaults.headers['Accept-Language'] = langKey;
};

export default axiosClient;

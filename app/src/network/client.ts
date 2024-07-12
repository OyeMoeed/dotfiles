import axios, { AxiosInstance } from 'axios';
import { I18nManager } from 'react-native';
import Config from 'react-native-config';

const { BASE_URL, REQUEST_TIMEOUT } = Config; // Set baseurl from con

declare module 'axios' {
  export interface AxiosRequestConfig {
    errorConfig?: {
      disableInterceptor?: (error: any) => boolean;
    };
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    disableUpdateSession?: boolean;
  }
}

class Client {
  clientInstance: AxiosInstance;

  constructor() {
    this.clientInstance = axios.create({
      baseURL: BASE_URL,
      timeout: Number(REQUEST_TIMEOUT),
      headers: {
        'Accept-Language': I18nManager.isRTL ? 'ar' : 'en',
      },
    });
    this.clientInstance = this.configureInterceptor(this.clientInstance);
  }

  configureInterceptor = (clientInstance: AxiosInstance) => {
    clientInstance.interceptors.request.use((config) => {
      const abortController = new AbortController();
      config.signal = abortController.signal;
      setTimeout(() => {
        if (!abortController.signal.aborted) {
          abortController.abort();
        }
      }, Number(REQUEST_TIMEOUT));
      return config;
    });

    return clientInstance;
  };

  setToken = (token: string | undefined) => {
    this.clientInstance.defaults.headers.common.Authorization = token;
  };

  setHeadersLang = (langKey: string) => {
    this.clientInstance.defaults.headers['Accept-Language'] = langKey;
  };
}

export default new Client();

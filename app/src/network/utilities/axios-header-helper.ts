import { I18nManager } from 'react-native';

const getDefaultAxiosHeaders = () => {
  const headers: { [key: string]: string } = {};
  headers['Content-Type'] = 'application/json';
  headers['api-version'] = 'v1';
  headers.app_version = '2.0.0';
  headers['Accept-Language'] = I18nManager.isRTL ? 'ar' : 'en';

  return headers;
};

export default getDefaultAxiosHeaders;

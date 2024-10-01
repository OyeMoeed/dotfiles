import { I18nManager } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const getDefaultAxiosHeaders = () => {
  const headers: { [key: string]: string } = {};
  headers['Content-Type'] = 'application/json';
  headers['api-version'] = 'v1';
  headers.app_version = '2.0.0';
  headers['Accept-Language'] = I18nManager.isRTL ? 'ar' : 'en';
  headers.app_version = DeviceInfo.getVersion();

  return headers;
};

export default getDefaultAxiosHeaders;

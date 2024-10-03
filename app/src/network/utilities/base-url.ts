import { getValueFromAsyncStorage, StorageKeys } from '@app/utilities';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import { setBaseURL } from '../client';

/**
 * @description check if current enverioment is not production
 */
const isNonProductionEnv = (): boolean => {
  const bundleID = DeviceInfo.getBundleId();
  const isProdBundle = bundleID.substring(bundleID.lastIndexOf('.'), bundleID.length) === '.mobile';
  return !isProdBundle;
};

/**
 * @description update API baseURL with user selected one from storage, only in none production build
 */
const updateBaseURL = async () => {
  if (isNonProductionEnv()) {
    const selectedEnv = await getValueFromAsyncStorage(StorageKeys.ENV);
    const urls = JSON.parse(Config.ENV_URLS);
    if (selectedEnv) setBaseURL(urls[selectedEnv]);
  }
};

const isEditableBaseURL = (): boolean => {
  const { BASE_URL } = Config;
  const currentEnv = BASE_URL.substring(BASE_URL.indexOf('//') + 2, BASE_URL.indexOf('//') + 5);
  const editableEnvs = ['sit', 'uat', 'div'];
  return editableEnvs.includes(currentEnv);
};

export { isNonProductionEnv, updateBaseURL, isEditableBaseURL };

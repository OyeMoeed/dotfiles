import { hideAlert, showAlert } from '@app/store/slices/alert-slice';
import { store } from '@app/store/store';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { InternalAxiosRequestConfig } from 'axios';

const { REQUEST_TIMEOUT } = Config;

const onResquestFulfilled = async (config: InternalAxiosRequestConfig) => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    store.dispatch(showAlert());
  } else {
    store.dispatch(hideAlert());
  }

  const abortController = new AbortController();
  config.signal = abortController.signal;
  config.headers.x_hide_error_response = false;

  setTimeout(() => {
    if (!abortController.signal.aborted) {
      abortController.abort();
    }
  }, Number(REQUEST_TIMEOUT));
  return config;
};

export default onResquestFulfilled;

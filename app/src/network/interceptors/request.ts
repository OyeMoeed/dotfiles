import { hideAlert, showAlert } from '@app/store/slices/alert-slice';
import { store } from '@app/store/store';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import { InternalAxiosRequestConfig } from 'axios';
import { showSpinner } from '@app/store/slices/spinner.slice';

const { REQUEST_TIMEOUT } = Config;

const onRequestFulfilled = async (config: InternalAxiosRequestConfig) => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    store.dispatch(showAlert());
  } else {
    store.dispatch(hideAlert());
    // store.dispatch(showSpinner());
  }

  const abortController = new AbortController();
  config.signal = abortController.signal;
  config.headers.x_hide_error_response = false;
  config.headers.x_hide_spinner_loading = false;

  setTimeout(() => {
    if (!abortController.signal.aborted) {
      abortController.abort();
    }
  }, Number(REQUEST_TIMEOUT));
  return config;
};

export default onRequestFulfilled;

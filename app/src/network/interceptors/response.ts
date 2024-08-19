import { showSessionTimeoutAlert } from '@app/store/slices/alert-slice';
import { store } from '@app/store/store';
import { AxiosError, AxiosResponse } from 'axios';
import { clientError } from '../client.type';
import constants from '../constants';
import { logoutProcess } from '../utilities/network-session-helper';

const onResponseReject = async (error: AxiosError<clientError>) => {
  const { auth } = store.getState();
  if (error.response?.status === constants.ERROR_CODES.UNAUTHORIZED) {
    if (auth?.isAuthorized) {
      await logoutProcess();
    }
    return;
  } else if (error.response?.status === constants.ERROR_CODES.FORBIDDEN) {
    if (auth?.isAuthorized) {
      store.dispatch(showSessionTimeoutAlert());
    }
    return;
  }

  Promise.reject(error);
};

const onResponseFulfilled = async (response: AxiosResponse) => {
  return response;
};

export { onResponseFulfilled, onResponseReject };


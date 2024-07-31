import { store } from '@app/store/store';
import { AxiosError, AxiosResponse } from 'axios';
import { clientError } from '../client.type';
import constants from '../constants';
import { logoutProcess } from '../utilities/network-session-helper';

const onResponseReject = async (error: AxiosError<clientError>) => {
  if (
    error.response?.status === constants.ERROR_CODES.UNAUTHORIZED ||
    error.response?.status === constants.ERROR_CODES.FORBIDDEN
  ) {
    const { auth } = store.getState();
    if (auth?.isAuthorized) {
      await logoutProcess();
    }
    return;
  }

  Promise.reject(error);
};

const onResponseFulfilled = async (response: AxiosResponse) => {
  return response;
};

export { onResponseFulfilled, onResponseReject };

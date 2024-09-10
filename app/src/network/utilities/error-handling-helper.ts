import { AxiosError, AxiosResponse } from 'axios';
import { showServiceCallErrorToast, showSessionTimeoutAlert } from '@app/store/slices/alert-slice';
import { store } from '@app/store/store';
import clearSession from './network-session-helper';
import constants from '../constants';
import { mapApiError } from '../services/api-call.interceptors';

const hideErrorResponse = (response: AxiosResponse | AxiosError) => response?.config?.headers.hide_error_response;

const isErrorResponse = (response: AxiosResponse) => {
  if (response?.status !== constants.SUCCESS_RESPONSE) return true;
  if (response?.data?.status?.type === 'SUCCESS') return false;
  if (response?.data?.successfulResponse) return false;
  return true;
};

const handleAxiosError = async (error: AxiosResponse | AxiosError) => {
  const { auth, alertReducer } = store.getState();
  if ((error as AxiosError)?.response?.status === constants.ERROR_CODES.UNAUTHORIZED) {
    if (auth?.isAuthorized) {
      await clearSession(false);
    }
  }
  if ((error as AxiosError)?.response?.status === constants.ERROR_CODES.FORBIDDEN) {
    if (auth?.isAuthorized) {
      store.dispatch(showSessionTimeoutAlert());
      return;
    }
  }
  const mappedError = mapApiError(error);
  if (hideErrorResponse(error)) return;
  if (mappedError?.status?.desc && !alertReducer?.serviceCallError) {
    store.dispatch(showServiceCallErrorToast(mappedError?.status.desc));
  }
};

export { hideErrorResponse, isErrorResponse, handleAxiosError };

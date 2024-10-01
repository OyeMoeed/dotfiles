import { AxiosError, AxiosResponse } from 'axios';
import { showServiceCallErrorToast, showSessionTimeoutAlert } from '@app/store/slices/alert-slice';
import { store } from '@app/store/store';
import clearSession from './network-session-helper';
import constants from '../constants';
import { mapApiError } from '../services/api-call.interceptors';
import { ApiResponse } from '../services/services.interface';

const hideErrorResponse = (response: AxiosResponse | AxiosError) => response?.config?.headers.hide_error_response;

const hideSpinnerLoading = (response: AxiosResponse | AxiosError) => response?.config?.headers.hide_spinner_loading;

const isErrorResponse = (response: AxiosResponse | ApiResponse<unknown>) => {
  if (response?.status !== constants.SUCCESS_RESPONSE) return true;
  if (response?.data?.status?.type === 'SUCCESS') return false;
  if (response?.data?.successfulResponse) return false;
  return true;
};

const handleAxiosError = async (error: AxiosResponse | AxiosError) => {
  const { auth, alertReducer } = store.getState();
  const responseStatus = (error as AxiosError)?.response?.status || '';

  if (responseStatus === constants.ERROR_CODES.UNAUTHORIZED) {
    if (auth?.isAuthorized) {
      await clearSession(false);
    }
  }
  if (responseStatus === constants.ERROR_CODES.FORBIDDEN) {
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

export { hideErrorResponse, hideSpinnerLoading, isErrorResponse, handleAxiosError };

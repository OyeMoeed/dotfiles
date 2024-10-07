import { AxiosError, AxiosResponse } from 'axios';
import { showServiceCallErrorToast, showSessionTimeoutAlert } from '@app/store/slices/alert-slice';
import { store } from '@app/store/store';
import { showForceMaintenance } from '@app/store/slices/app-maintenance-slice';
import clearSession from './network-session-helper';
import constants from '../constants';
import { mapApiError } from '../services/api-call.interceptors';
import { ApiResponse, ErrorStatus } from '../services/services.interface';
import logOut from '../services/core/logout/logout.service';

const hideErrorResponse = (response: AxiosResponse | AxiosError) => response?.config?.headers.hide_error_response;

const hideSpinnerLoading = (response: AxiosResponse | AxiosError) => response?.config?.headers.hide_spinner_loading;

const isErrorResponse = (response: AxiosResponse | ApiResponse<unknown>) => {
  if (response?.status !== constants.SUCCESS_RESPONSE) return true;
  if (response?.data?.status?.type === 'SUCCESS') return false;
  if (response?.data?.successfulResponse) return false;
  return true;
};

const handleAxiosError = async (error: AxiosResponse | AxiosError, hideAlert: boolean = false) => {
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
  if (hideAlert) return;
  if (hideErrorResponse(error)) return;
  if (mappedError?.status?.desc && !alertReducer?.serviceCallError) {
    store.dispatch(showServiceCallErrorToast(mappedError?.status.desc));
  }
};

const handleResponseError = async (response: AxiosResponse | AxiosError) => {
  const responseCode = (response as any)?.data?.status?.code;
  if (responseCode === ErrorStatus.FORCE_UPDATE) {
    return false;
  }
  if (responseCode === ErrorStatus.FORCE_MAINTENANCE) {
    const { isAuthorized } = store.getState().auth;
    if (isAuthorized) {
      await logOut();
      clearSession(false);
    }
    store.dispatch(showForceMaintenance());
    return true;
  }

  return false;
};

export { hideErrorResponse, hideSpinnerLoading, isErrorResponse, handleAxiosError, handleResponseError };

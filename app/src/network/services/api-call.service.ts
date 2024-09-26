import { hideSpinner, showSpinner } from '@app/store/slices/spinner.slice';
import { store } from '@app/store/store';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosClient from '../client';
import onRequestFulfilled from '../interceptors/request';
import { onResponseFulfilled, onResponseReject } from '../interceptors/response';
import { handleAxiosError, isErrorResponse } from '../utilities/error-handling-helper';
import { handleApiResponse } from './api-call.interceptors';
import { ApiResponse } from './services.interface';

interface ApiCallParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: any;
  headers?: any;
  baseURL?: string;
}

/* register interceptors here to avoid cyclic import error */
axiosClient.interceptors.request.use(onRequestFulfilled);
axiosClient.interceptors.response.use(onResponseFulfilled, onResponseReject);

const apiCall = async <T>({
  endpoint,
  method,
  payload,
  headers = {},
  baseURL = undefined,
}: ApiCallParams): Promise<ApiResponse<T> | undefined> => {
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers: {
      ...headers,
    },
    data: payload,
  };
  if (baseURL) config.baseURL = baseURL;
  const hideErrorResponse = headers?.hide_error_response;

  if (hideErrorResponse) {
    axiosClient.defaults.headers.x_hide_error_response = true;
  }
  if (headers?.hide_spinner_loading) {
    axiosClient.defaults.headers.x_hide_spinner_loading = true;
  }

  try {
    // show Spinner
    if (!headers?.hide_spinner_loading) {
      store.dispatch(showSpinner());
    }

    const response: AxiosResponse<T> = await axiosClient(config);
    if (isErrorResponse(response)) {
      store.dispatch(hideSpinner());
      await handleAxiosError(response);
      return hideErrorResponse ? undefined : handleApiResponse(response);
    }
    store.dispatch(hideSpinner());
    return handleApiResponse(response);
  } catch (error: any) {
    await handleAxiosError(error);
  }

  // Hide Spinner
  store.dispatch(hideSpinner());
  return undefined;
};

export default apiCall;

import { hideSpinner, showSpinner } from '@app/store/slices/spinner.slice';
import { store } from '@app/store/store';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosClient from '../client';
import onRequestFulfilled from '../interceptors/request';
import { onResponseFulfilled, onResponseReject } from '../interceptors/response';
import { handleAxiosError, isErrorResponse } from '../utilities/error-handling-helper';
import { handleApiResponse } from './api-call.interceptors';
import { ApiResponse } from './services.interface';
import queryClient from '../queryClient';

export interface QueryOptionsProps {
  invalidateCache?: boolean;
  reactQueryOptions?: {};
  queryId?: string;
}

const getQueryData = async ({
  config = {},
  options = {
    invalidateCache: false,
    reactQueryOptions: {},
    queryId: '',
  },
}: {
  config: AxiosRequestConfig;
  options: QueryOptionsProps;
}): Promise<AxiosResponse<any, any>> => {
  const { invalidateCache, reactQueryOptions, queryId } = options;
  const MILLIE_SECOND = 60 * 1000;
  const staleTime = 1000;

  queryClient.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: staleTime * MILLIE_SECOND,
      ...reactQueryOptions,
    },
  });

  if (invalidateCache) {
    queryClient?.invalidateQueries({ queryKey: [queryId] });
  }

  try {
    const response = await queryClient.fetchQuery({
      queryKey: [queryId],
      queryFn: async () => axiosClient(config),
    });

    return response;
  } catch (resError: any) {
    return resError;
  }
};

interface ApiCallParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: any;
  headers?: any;
  baseURL?: string;
  queryOptions: QueryOptionsProps;
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
  queryOptions: { invalidateCache, reactQueryOptions, queryId },
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
  if (headers?.hide_error_response) {
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
    let response: AxiosResponse<T>;

    if (method === 'GET') {
      response = await getQueryData({
        config,
        options: {
          invalidateCache,
          reactQueryOptions,
          queryId,
        },
      });
    } else {
      response = await axiosClient(config);
    }
    if (isErrorResponse(response)) {
      store.dispatch(hideSpinner());
      await handleAxiosError(response);
      return undefined;
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

import { AxiosError, AxiosResponse } from 'axios';
import { handleAxiosError, hideErrorResponse } from '../utilities/error-handling-helper';

const onResponseReject = async (error: AxiosError) => {
  if (hideErrorResponse(error)) {
    return error;
  }
  handleAxiosError(error);
  return error;
};

const onResponseFulfilled = async (response: AxiosResponse) => {
  if (hideErrorResponse(response)) return response;
  return response;
};

export { onResponseFulfilled, onResponseReject };

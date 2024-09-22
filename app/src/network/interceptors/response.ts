import NetInfo from '@react-native-community/netinfo';
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
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return response;
};

export { onResponseFulfilled, onResponseReject };

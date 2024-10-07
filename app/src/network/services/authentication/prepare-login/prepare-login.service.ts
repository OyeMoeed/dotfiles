import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { store } from '@app/store/store';
import { editTimer } from '@app/store/slices/idle-timer-slice';
import { ApiResponse, DeviceInfoProps } from '../../services.interface';
import AUTHENTICATION_URLS from '../authentication.urls';
import { PrePareLoginApiResponseProps } from './prepare-login.interface';
import prepareLoginMock from './prepare-login.mock';

type LoginPrepareResponse = ApiResponse<PrePareLoginApiResponseProps> | undefined;

const prepareLogin = async (payload: DeviceInfoProps, hideValue: boolean = false): Promise<LoginPrepareResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    const mockResponse = prepareLoginMock;
    return mockResponse;
  }
  const apiResponse = await apiCall<PrePareLoginApiResponseProps>({
    endpoint: AUTHENTICATION_URLS.PREPARE_LOGIN,
    method: requestType.POST,
    payload,
    headers: {
      hide_spinner_loading: hideValue,
      hide_error_response: hideValue,
    },
  });
  store.dispatch(editTimer(apiResponse?.response?.inactiveTimeoutPeriodInMins));

  return apiResponse;
};

export default prepareLogin;

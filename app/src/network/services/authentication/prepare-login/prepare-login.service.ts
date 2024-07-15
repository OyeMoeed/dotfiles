import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import apiCall from '@network/services/api-call.service';
import { ApiError, ApiResponse, ApiResponseNotOk } from '../../services.interface';
import AUTHENTICATION_URLS from '../authentication.urls';
import { PrePareLoginApiResponseProps } from './prepare-login.interface';
import prepareLoginMock from './prepare-login.mock';

type LoginPrepareResponse = ApiResponse<PrePareLoginApiResponseProps> | ApiResponseNotOk | ApiError;

const prepareLogin = async (): Promise<LoginPrepareResponse> => {
  const deviceInfo = await getDeviceInfo();
  if (constants.MOCK_API_RESPONSE) {
    const mockResponse = prepareLoginMock;
    return mockResponse;
  }
  try {
    const apiResponse = await apiCall<PrePareLoginApiResponseProps>({
      endpoint: AUTHENTICATION_URLS.PREPARE_LOGIN,
      method: requestType.POST,
      payload: deviceInfo,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default prepareLogin;

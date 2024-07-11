import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { setAppData } from '@app/store/slices/app-data-slice';
import apiCall from '@network/services/api-call.service';
import AUTHENTICATION_URLS from '../authentication.urls';
import prepareLoginMock from './prepare-login.mock';

const prepareLogin = async (): Promise<object> => {
  const deviceInfo = await getDeviceInfo();
  if (constants.MOCK_API_RESPONSE) {
    const mockResponse = prepareLoginMock;
    const { transactionId } = mockResponse?.data?.authentication || {};
    //dispatch(setAppData({ transactionId, encryptionData: mockResponse?.data?.response, deviceInfo }));
    return mockResponse;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: AUTHENTICATION_URLS.PREPARE_LOGIN,
      method: requestType.POST,
      payload: deviceInfo,
    });

    if (apiResponse?.ok) {

      const { transactionId } = apiResponse?.data?.authentication.transactionId || {};
      return  apiResponse ;
    }
    return { apiResponseNotOk: true };
  } catch (error :any) {
    console.error('Error preparing login:', error);
    return { error: error.message || 'Unknown error' };
  }
};

export default prepareLogin;

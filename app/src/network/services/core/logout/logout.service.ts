import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import clearSession from '@app/network/utilities/network-session-helper';
import AUTHENTICATION_URLS from '../../authentication/authentication.urls';
import delinkDeviceMock from '../delink/delink.mock';

const logOut = async (): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return delinkDeviceMock;
  }

  try {
    const apiResponse: any = await apiCall({
      endpoint: AUTHENTICATION_URLS.LOGOUT,
      method: requestType.POST,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      await clearSession(false);
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default logOut;

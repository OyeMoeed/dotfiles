import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import AUTHENTICATION_URLS from '../../authentication/authentication.urls';

const logOut = async (): Promise<unknown> => {
  try {
    const apiResponse: any = await apiCall({
      endpoint: AUTHENTICATION_URLS.LOGOUT(),
      method: requestType.POST,
    });

    if (apiResponse?.status?.type === "SUCCESS") {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default logOut;

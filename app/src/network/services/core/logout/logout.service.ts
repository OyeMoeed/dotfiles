import { setToken } from '@app/network/client';
import requestType from '@app/network/request-types.network';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setAuth } from '@app/store/slices/auth-slice';
import { store } from '@app/store/store';
import apiCall from '@network/services/api-call.service';
import AUTHENTICATION_URLS from '../../authentication/authentication.urls';

const logOut = async (): Promise<unknown> => {
  try {
    const apiResponse: any = await apiCall({
      endpoint: AUTHENTICATION_URLS.LOGOUT,
      method: requestType.POST,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      const { dispatch } = store || {};
      dispatch(
        setAppData({
          isAuthenticated: false,
          hideBalance: false,
        }),
      );
      dispatch(setAuth(false));
      setToken(undefined);
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default logOut;

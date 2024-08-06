import constants from '@app/constants/constants';
import { setToken } from '@app/network/client';
import requestType from '@app/network/request-types.network';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setAuth } from '@app/store/slices/auth-slice';
import { setUserInfo } from '@app/store/slices/user-information-slice';
import { store } from '@app/store/store';
import { clearAsyncStorage } from '@app/utilities/storage-helper.util';
import apiCall from '@network/services/api-call.service';
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
      await clearSession();
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};
const clearSession = async (isDelink: boolean) => {
  clearAsyncStorage();
  const { dispatch } = store || {};
  dispatch(
    setAppData({
      isAuthenticated: false,
      hideBalance: false,
    }),
  );
  dispatch(setAuth(false));
  if(isDelink){
    dispatch(setAppData({
      isLinkedDevice: false 
    }),)
    dispatch(setUserInfo(undefined))
  }
  setToken(undefined);
}

export { clearSession, logOut };


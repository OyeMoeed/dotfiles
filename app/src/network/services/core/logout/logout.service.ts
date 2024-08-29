import constants, { DASHBOARD_ITEMS } from '@app/constants/constants';
import { setToken } from '@app/network/client';
import requestType from '@app/network/request-types.network';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setAuth } from '@app/store/slices/auth-slice';
import { setRearrangedItems } from '@app/store/slices/rearrangement-slice';
import { setUserInfo } from '@app/store/slices/user-information-slice';
import { store } from '@app/store/store';
import { EncryptedService } from '@app/utilities/enum/encrypted-keys.enum';
import { deleteData } from '@app/utilities/keychain.utils';
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
  const { dispatch } = store || {};
  clearAsyncStorage();
  if (isDelink) {
    await deleteData(EncryptedService.AUTH);
    dispatch(
      setAppData({
        isLinkedDevice: false,
        biomatricEnabled: false,
        isAuthenticated: false,
        hideBalance: false,
        passCode: '',
        hasVistedDashboard: false,
        allowEyeIconFunctionality: false,
      }),
    );
    dispatch(setUserInfo(undefined));
    dispatch(setRearrangedItems(DASHBOARD_ITEMS));
  }

  dispatch(
    setAppData({
      isAuthenticated: false,
      hideBalance: false,
    }),
  );
  dispatch(setAuth(false));

  setToken(undefined);
};

export { clearSession, logOut };

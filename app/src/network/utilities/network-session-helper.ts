import { DASHBOARD_ITEMS } from '@app/constants/constants';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setAuth } from '@app/store/slices/auth-slice';
import { setRearrangedItems } from '@app/store/slices/rearrangement-slice';
import { resetWalletInfo } from '@app/store/slices/wallet-info-slice';
import { store } from '@app/store/store';
import { EncryptedService } from '@app/utilities/enum/encrypted-keys.enum';
import { deleteData } from '@app/utilities/keychain.utils';
import { clearAsyncStorage } from '@app/utilities/storage-helper.util';
import { setToken } from '../client';
import queryClient from '../query-client';

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
    dispatch(resetWalletInfo());
    dispatch(setRearrangedItems(DASHBOARD_ITEMS));
    queryClient.removeQueries();
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

export default clearSession;

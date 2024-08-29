import { setAppData } from '@app/store/slices/app-data-slice';
import { setAuth } from '@app/store/slices/auth-slice';
import { setUserInfo } from '@app/store/slices/user-information-slice';
import { store } from '@app/store/store';
import { EncryptedService } from '@app/utilities/enum/encrypted-keys.enum';
import { deleteData } from '@app/utilities/keychain.utils';
import { clearAsyncStorage } from '@app/utilities/storage-helper.util';
import { setToken } from '../client';

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
      }),
    );
    dispatch(setUserInfo(undefined));
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

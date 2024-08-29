import { setAppData } from '@app/store/slices/app-data-slice';
import { setUserInfo } from '@app/store/slices/user-information-slice';
import { store } from '@app/store/store';
import { EncryptedService } from '@app/utilities/enum/encrypted-keys.enum';
import { deleteData } from '@app/utilities/keychain.utils';
import { clearAsyncStorage } from '@app/utilities/storage-helper.util';
import { setRearrangedItems } from '@app/store/slices/rearrangement-slice';
import { DASHBOARD_ITEMS } from '@app/constants/constants';

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
};

export default clearSession;

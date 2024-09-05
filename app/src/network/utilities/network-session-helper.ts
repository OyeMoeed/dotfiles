import { setAppData } from '@app/store/slices/app-data-slice';
import { store } from '@app/store/store';
import { EncryptedService } from '@app/utilities/enum/encrypted-keys.enum';
import { deleteData } from '@app/utilities/keychain.utils';
import { clearAsyncStorage } from '@app/utilities/storage-helper.util';
import { setRearrangedItems } from '@app/store/slices/rearrangement-slice';
import { DASHBOARD_ITEMS } from '@app/constants/constants';
import { resetWalletInfo } from '@app/store/slices/wallet-info-slice';

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
  }
};

export default clearSession;

import { setIdRenewalSheetVisibility, setProfileSheetVisibility } from '@app/store/slices/bottom-sheets-slice';
import { isBasicTierSelector } from '@app/store/slices/wallet-info-slice';
import { store } from '@store/store';

const checkUserAccess = (fromHome = false) => {
  const state = store.getState();
  const { dispatch } = store;

  const { idExpired, aboutToExpire } = state.walletInfoReducer.walletInfo;

  const isBasicTeir = isBasicTierSelector(state);
  if (isBasicTeir) {
    dispatch(setProfileSheetVisibility(true));
    return false; // return false
  }

  if (idExpired) {
    dispatch(setIdRenewalSheetVisibility(true));
    return false;
  }

  if (fromHome && aboutToExpire) {
    dispatch(setIdRenewalSheetVisibility(true));
    return false;
  }

  return true;
};

export default checkUserAccess;

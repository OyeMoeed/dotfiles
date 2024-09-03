import { setProfileSheetVisibility } from '@app/store/slices/nafath-verification';
import { isBasicTierSelector } from '@app/store/slices/user-information-slice';
import { openIdRenewalSheet } from '@app/store/slices/wallet-info-slice';
import { store } from '@store/store';

const checkUserAccess = () => {
  const state = store.getState();
  const { dispatch } = store;

  const { idExpired, aboutToExpire } = state.walletInfoReducer.walletInfo;

  const isBasicTeir = isBasicTierSelector(state);
  if (isBasicTeir) {
    dispatch(setProfileSheetVisibility(true));
    return false; // return false
  }

  if (idExpired || aboutToExpire) {
    dispatch(openIdRenewalSheet());
    return false;
  }

  return true;
};

export default checkUserAccess;

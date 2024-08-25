import { store } from '@store/store';
import { openProfileSheet } from '@app/store/slices/nafath-verification';
import { isBasicTierSelector } from '@app/store/slices/user-information-slice';
import { openIdRenewalSheet } from '@app/store/slices/wallet-info-slice';

const checkUserAccess = () => {
  const state = store.getState();
  const { dispatch } = store;

  const { idExpired } = state.walletInfoReducer.walletInfo;

  const isBasicTeir = isBasicTierSelector(state);
  if (isBasicTeir) {
    dispatch(openProfileSheet());
    return false; // return false
  }

  if (!idExpired) {
    dispatch(openIdRenewalSheet());
    return false;
  }

  return true;
};

export default checkUserAccess;

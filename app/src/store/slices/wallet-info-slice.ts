import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

/**
 * Initial state for the wallet info slice.
 */
const initialState = {
  walletInfo: {
    currentBalance: 1000,
    mobileNumber: '',
  },
};

/**
 * Slice for managing wallet info in the Redux store.
 */
const walletInfoSlice = createSlice({
  name: SLICE_NAMES.WALLET_INFO_SLICE,
  initialState,
  reducers: {
    /**
     * Reducer function for setting the wallet info.
     * @param state - The current state of the wallet info slice.
     * @param action - The action containing the wallet info payload.
     */
    // setWalletInfo(state, action: PayloadAction<any>) {
    //   state.walletInfo = action.payload;
    // },
    setWalletInfo(state, action: PayloadAction<any>) {
      state.walletInfo = {
        ...state.walletInfo,
        ...action.payload, // Merge the new data with the existing walletInfo
      };
    },
  },
});

/**
 * Action creators for setting the wallet info and login data.
 */
export const { setWalletInfo } = walletInfoSlice.actions;

/**
 * Reducer function for the wallet info slice.
 */
export default walletInfoSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
import { AppDataInitialStateProps } from './app-data-slice.type';

/**
 * Initial state for the app data slice.
 */
const initialState: AppDataInitialStateProps = {
  appData: {
    transactionId: '',
    mobileNumber: '',
    poi: '',
    deviceInfo: {},
    isAuthenticated: false,
    isLinkedDevice: false,
    isFirstTime: true,
    hideBalance: false,
    biomatricEnabled: false,
    encryptionData: {
      passwordEncryptionPrefix: '',
      passwordEncryptionKey: '',
    },
    authorizationToken: '',
  },
};

/**
 * Slice for managing app data in the Redux store.
 */
const appDataSlice = createSlice({
  name: SLICE_NAMES.APP_DATA_SLICE,
  initialState,
  reducers: {
    /**
     * Reducer function for setting the app data.
     * @param state - The current state of the app data slice.
     * @param action - The action containing the app data payload.
     */
    // setAppData(state, action: PayloadAction<any>) {
    //   state.appData = action.payload;
    // },
    setAppData(state, action: PayloadAction<any>) {
      state.appData = {
        ...state.appData,
        ...action.payload, // Merge the new data with the existing appData
      };
    },
  },
});

/**
 * Action creators for setting the app data and login data.
 */
export const { setAppData } = appDataSlice.actions;

/**
 * Reducer function for the app data slice.
 */
export default appDataSlice.reducer;

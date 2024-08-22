import { SLICE_NAMES } from '@app/store/constants.store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/**
 * Interface representing the initial state shape for localization settings.
 */
interface AuthInitialStateProps {
  isAuthorized: boolean;
}

/**
 * Initial state for the localization slice.
 */
const initialState: AuthInitialStateProps = {
  isAuthorized: false,
};

/**
 * Slice for managing localization settings in the Redux store.
 */
export const authSlice = createSlice({
  name: SLICE_NAMES.AUTH_SLICE,
  initialState,
  reducers: {
    /**
     * Reducer function for setting the localization flag in the state.
     * @param state - The current state of the localization slice.
     * @param action - The action containing the localization flag payload.
     */
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
  },
});

/**
 * Action creator for setting the localization flag.
 */
export const { setAuth } = authSlice.actions;

/**
 * Reducer function for the localization slice.
 */
export default authSlice.reducer;

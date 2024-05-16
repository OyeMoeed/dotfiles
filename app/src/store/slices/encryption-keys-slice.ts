import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '@store/constants';
/**
 * Interface representing the state shape for encryption keys.
 */
interface EncryptionState {
  encryptionKeys?: object;
}

/**
 * Initial state for the encryption keys slice.
 */
const initialState: EncryptionState = {};

/**
 * Slice for managing encryption keys in the Redux store.
 */
export const encryptionKeysSlice = createSlice({
  name: SLICE_NAMES.ENCRYPTION_KEYS_SLICE,
  initialState,
  reducers: {
    /**
     * Reducer function for setting encryption keys in the state.
     * @param state - The current state of the encryption keys slice.
     * @param action - The action containing the encryption keys payload.
     */
    setEncryptionKeys(state, action: PayloadAction<object | undefined>) {
      state.encryptionKeys = action.payload;
    }
  }
});

/**
 * Action creator for setting encryption keys.
 */
export const { setEncryptionKeys } = encryptionKeysSlice.actions;

/**
 * Reducer function for the encryption keys slice.
 */
export const encryptionKeysReducer = encryptionKeysSlice.reducer;

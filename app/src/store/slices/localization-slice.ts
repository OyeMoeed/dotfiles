import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '@store/constants';
import { languages } from '@utilities/enums';

/**
 * Interface representing the initial state shape for localization settings.
 */
interface LocalizationInitialStateProps {
  localizationFlag: string;
}

/**
 * Initial state for the localization slice.
 */
const initialState: LocalizationInitialStateProps = {
  localizationFlag: languages.EN
};

/**
 * Slice for managing localization settings in the Redux store.
 */
export const localizationSlice = createSlice({
  name: SLICE_NAMES.LOCALIZATION_SLICE,
  initialState,
  reducers: {
    /**
     * Reducer function for setting the localization flag in the state.
     * @param state - The current state of the localization slice.
     * @param action - The action containing the localization flag payload.
     */
    setLocalization(state, action: PayloadAction<string>) {
      state.localizationFlag = action.payload;
    }
  }
});

/**
 * Action creator for setting the localization flag.
 */
export const { setLocalization } = localizationSlice.actions;

/**
 * Reducer function for the localization slice.
 */
export default localizationSlice.reducer;

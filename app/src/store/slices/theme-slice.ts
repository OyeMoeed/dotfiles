import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '@store/constants';

/**
 * Interface representing the initial state shape for theme settings.
 */
interface ThemeInitialStateProps {
  appTheme: string;
}

/**
 * Initial state for the theme slice.
 */
const initialState: ThemeInitialStateProps = {
  appTheme: 'lightTheme'
};

/**
 * Slice for managing theme settings in the Redux store.
 */
export const themeSlice = createSlice({
  name: SLICE_NAMES.THEME_SLICE,
  initialState,
  reducers: {
    /**
     * Reducer function for setting the application theme in the state.
     * @param state - The current state of the theme slice.
     * @param action - The action containing the theme payload.
     */
    setTheme(state, action: PayloadAction<string>) {
      state.appTheme = action.payload;
    }
  }
});

/**
 * Action creator for setting the application theme.
 */
export const { setTheme } = themeSlice.actions;

/**
 * Reducer function for the theme slice.
 */
export default themeSlice.reducer;

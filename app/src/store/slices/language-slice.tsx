import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
import { getLocalization } from '@app/utilities/language.utils';
import { LanguageCode } from '@app/utilities/enums.util';
import { LanguageState } from './language-sclice.interface';



const initialState: LanguageState = {
  isLanguageSheetVisible: false,
  selectedLanguage: getLocalization(),
};

export const languageSlice = createSlice({
  name: SLICE_NAMES.LANGUAGE_SLICE,
  initialState,
  reducers: {
    showLanguageSheet: (state) => {
      state.isLanguageSheetVisible = true;
    },
    hideLanguageSheet: (state) => {
      state.isLanguageSheetVisible = false;
    },
    setSelectedLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.selectedLanguage = action.payload;
    },
    loadSelectedLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

// Export action creators with proper types
export const { showLanguageSheet, hideLanguageSheet, setSelectedLanguage, loadSelectedLanguage } =
  languageSlice.actions;

export default languageSlice.reducer;

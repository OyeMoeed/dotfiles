import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface NafathVerificationState {
  isProfileSheetVisible: boolean;
  isNafathSheetVisible: boolean;
}

const initialState: NafathVerificationState = {
  isProfileSheetVisible: false,
  isNafathSheetVisible: false,
};

const nafathVerificationSlice = createSlice({
  name: SLICE_NAMES.NAFAT_VERIFICATION_SLICE,
  initialState,
  reducers: {
    toggleProfileSheet: (state) => {
      state.isProfileSheetVisible = !state.isProfileSheetVisible;
    },
    toggleNafathSheet: (state) => {
      state.isNafathSheetVisible = !state.isNafathSheetVisible;
    },
  },
});

export const { toggleProfileSheet, toggleNafathSheet } = nafathVerificationSlice.actions;

export default nafathVerificationSlice.reducer;

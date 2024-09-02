import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    openProfileSheet: (state) => {
      state.isProfileSheetVisible = true;
    },
    closeProfileSheet: (state) => {
      state.isProfileSheetVisible = false;
    },
    openNafathSheet: (state) => {
      state.isNafathSheetVisible = true;
    },
    closeNafathSheet: (state) => {
      state.isNafathSheetVisible = false;
    },
  },
});

export const {
  openProfileSheet,
  closeProfileSheet,
  openNafathSheet,
  closeNafathSheet,
} = nafathVerificationSlice.actions;


export default nafathVerificationSlice.reducer;

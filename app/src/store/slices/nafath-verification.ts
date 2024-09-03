import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    setProfileSheetVisibility: (state, action: PayloadAction<boolean>) => {
      state.isProfileSheetVisible = action.payload;
    },
    setNafathSheetVisibility: (state, action: PayloadAction<boolean>) => {
      state.isNafathSheetVisible = action.payload;
    },
  },
});

export const { setProfileSheetVisibility, setNafathSheetVisibility } = nafathVerificationSlice.actions;

export default nafathVerificationSlice.reducer;

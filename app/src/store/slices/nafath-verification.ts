import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface NafathVerificationState {
  isProfileSheetVisible: boolean;
  isNafathSheetVisible: boolean;
  isTermsConditionsVisible: boolean;
  termsAndConditionsURL: string | null;
  isVirtualCardTermsAndConditions: boolean;
}

const initialState: NafathVerificationState = {
  isProfileSheetVisible: false,
  isNafathSheetVisible: false,
  isTermsConditionsVisible: false,
  termsAndConditionsURL: null,
  isVirtualCardTermsAndConditions: false,
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
    setTermsConditionsVisibility: (
      state,
      action: PayloadAction<{
        isVisible: boolean;
        termsAndConditionsURL?: string;
        isVirtualCardTermsAndConditions?: boolean;
      }>,
    ) => {
      const { isVisible, termsAndConditionsURL, isVirtualCardTermsAndConditions = false } = action.payload;

      state.isTermsConditionsVisible = isVisible;
      if (termsAndConditionsURL) {
        state.termsAndConditionsURL = termsAndConditionsURL;
      }
      if (typeof isVirtualCardTermsAndConditions === 'boolean') {
        state.isVirtualCardTermsAndConditions = isVirtualCardTermsAndConditions;
      }
    },
  },
});

export const { setProfileSheetVisibility, setNafathSheetVisibility, setTermsConditionsVisibility } =
  nafathVerificationSlice.actions;
export default nafathVerificationSlice.reducer;

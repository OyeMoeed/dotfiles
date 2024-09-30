import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface BottomSheetState {
  isProfileSheetVisible: boolean;
  isNafathSheetVisible: boolean;
  isNafathTerms: boolean;
  isTermsConditionsVisible: boolean;
  termsAndConditionsURL: string | null;
  isVirtualCardTermsAndConditions: boolean;
  isIdRenewalSheetVisible: boolean;
}

const initialState: BottomSheetState = {
  isProfileSheetVisible: false,
  isNafathSheetVisible: false,
  isTermsConditionsVisible: false,
  isNafathTerms: false,
  termsAndConditionsURL: null,
  isVirtualCardTermsAndConditions: false,
  isIdRenewalSheetVisible: false,
};

const BottomSheetSlice = createSlice({
  name: SLICE_NAMES.BOTTOM_SHEET_SLICE,
  initialState,
  reducers: {
    setProfileSheetVisibility: (state, action: PayloadAction<boolean>) => {
      state.isProfileSheetVisible = action.payload;
    },
    setNafathSheetVisibility: (state, action: PayloadAction<boolean>) => {
      state.isNafathSheetVisible = action.payload;
    },
    setIdRenewalSheetVisibility: (state, action: PayloadAction<boolean>) => {
      state.isIdRenewalSheetVisible = action.payload;
    },
    setTermsConditionsVisibility: (
      state,
      action: PayloadAction<{
        isVisible: boolean;
        termsAndConditionsURL?: string;
        isVirtualCardTermsAndConditions?: boolean;
        isNafathTerms?: boolean;
      }>,
    ) => {
      const {
        isVisible,
        termsAndConditionsURL,
        isVirtualCardTermsAndConditions = false,
        isNafathTerms = false,
      } = action.payload;

      state.isTermsConditionsVisible = isVisible;
      if (termsAndConditionsURL) {
        state.termsAndConditionsURL = termsAndConditionsURL;
      }
      if (isNafathTerms) {
        state.isNafathTerms = isNafathTerms;
      }
      if (typeof isVirtualCardTermsAndConditions === 'boolean') {
        state.isVirtualCardTermsAndConditions = isVirtualCardTermsAndConditions;
      }
    },
  },
});

export const {
  setProfileSheetVisibility,
  setNafathSheetVisibility,
  setTermsConditionsVisibility,
  setIdRenewalSheetVisibility,
} = BottomSheetSlice.actions;
export default BottomSheetSlice.reducer;

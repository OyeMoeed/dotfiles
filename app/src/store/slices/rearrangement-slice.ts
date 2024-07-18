import FeatureSections from '@app/utilities/enum/feature-sections.enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface RearrangementState {
  items: string[];
}

const initialState: RearrangementState = {
  items: [
    FeatureSections.ACTION_SECTIONS,
    FeatureSections.SUGGESTED_FOR_YOU,
    FeatureSections.TRANSACTION_HISTORY,
    FeatureSections.LATEST_OFFERS,
  ],
};

const rearrangementSlice = createSlice({
  name: SLICE_NAMES.RE_ARRANGE_SLICE,
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = rearrangementSlice.actions;
export default rearrangementSlice.reducer;

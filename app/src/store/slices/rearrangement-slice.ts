import featureSections from '@app/utilities/enum/feature-sections.enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface RearrangementState {
  items: string[];
}

const initialState: RearrangementState = {
  items: [
    featureSections.ACTION_SECTIONS,
    featureSections.SUGGESTED_FOR_YOU,
    featureSections.TRANSACTION_HISTORY,
    featureSections.LATEST_OFFERS
  ]
};

const rearrangementSlice = createSlice({
  name: SLICE_NAMES.RE_ARRANGE_SLICE,
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
    }
  }
});

export const { setItems } = rearrangementSlice.actions;
export default rearrangementSlice.reducer;

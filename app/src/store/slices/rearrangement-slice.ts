import { DASHBOARD_ITEMS } from '@app/constants/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface RearrangementState {
  items: string[];
}

const initialState: RearrangementState = {
  items: DASHBOARD_ITEMS,
};

const rearrangementSlice = createSlice({
  name: SLICE_NAMES.RE_ARRANGE_SLICE,
  initialState,
  reducers: {
    setRearrangedItems(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
    },
  },
});

export const { setRearrangedItems } = rearrangementSlice.actions;
export default rearrangementSlice.reducer;

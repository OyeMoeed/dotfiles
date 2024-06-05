import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface RearrangementState {
  items: string[];
}

const initialState: RearrangementState = {
  items: [
    'Action Section',
    'Suggested for you',
    'Transaction History',
    'Latest Offers',
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

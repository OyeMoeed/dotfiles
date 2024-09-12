import { SLICE_NAMES } from '@app/store/constants.store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/**
 * Slice for managing multiple reset state flags in the Redux store.
 * To handle the cases when we navigate back few screens and want the reset state
 */

interface ResetStateInitialStateProps {
  pointsRedemption: boolean;
}

const initialState: ResetStateInitialStateProps = {
  pointsRedemption: false,
};

export const resetStateSlice = createSlice({
  name: SLICE_NAMES.RESET_STATE_SLICE,
  initialState,
  reducers: {
    setPointsRedemptionReset(state, action: PayloadAction<boolean>) {
      state.pointsRedemption = action.payload;
    },
  },
});

export const { setPointsRedemptionReset } = resetStateSlice.actions;

export default resetStateSlice.reducer;

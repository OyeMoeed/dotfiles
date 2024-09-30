import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface ForceUpdateState {
  visible: boolean;
}

const initialState: ForceUpdateState = {
  visible: false,
};

const forceUpdateSlice = createSlice({
  name: SLICE_NAMES.FORCE_UPDATE_SLICE,
  initialState,
  reducers: {
    showForceUpdate: (state) => {
      state.visible = true;
    },
    hideForceUpdate: (state) => {
      state.visible = false;
    },
  },
});

export const { showForceUpdate, hideForceUpdate } = forceUpdateSlice.actions;

export default forceUpdateSlice.reducer;

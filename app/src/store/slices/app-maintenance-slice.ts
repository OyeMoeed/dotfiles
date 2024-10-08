import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface forceMaintenanceState {
  visible: boolean;
}

const initialState: forceMaintenanceState = {
  visible: false,
};

const forceMaintenanceSlice = createSlice({
  name: SLICE_NAMES.FORCE_MAINTENANCE_SLICE,
  initialState,
  reducers: {
    showForceMaintenance: (state) => {
      state.visible = true;
    },
    hideForceMaintenance: (state) => {
      state.visible = false;
    },
  },
});

export const { showForceMaintenance, hideForceMaintenance } = forceMaintenanceSlice.actions;

export default forceMaintenanceSlice.reducer;

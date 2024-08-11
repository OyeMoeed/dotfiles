// src/store/alertshowPermissionpermissionAlertSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
interface PermissionAlertState {
  visible: boolean;
}

const initialState: PermissionAlertState = {
  visible: false,
};

const permissionAlertSlice = createSlice({
  name: SLICE_NAMES.PERMISSION_ALERT_SLICE,
  initialState,
  reducers: {
    showPermissionAlert: (state) => {
      state.visible = true;
    },
    hidePermissionAlert: (state) => {
      state.visible = false;
    },
  },
});

export const { showPermissionAlert, hidePermissionAlert } = permissionAlertSlice.actions;

export default permissionAlertSlice.reducer;

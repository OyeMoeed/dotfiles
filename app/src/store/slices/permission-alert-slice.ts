// src/store/alertshowPermissionpermissionAlertSlice.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
interface PermissionAlertState {
  visible: boolean;
  title?: string;
  description?: string;
}

const initialState: PermissionAlertState = {
  visible: false,
  title: '',
  description: '',
};

const permissionAlertSlice = createSlice({
  name: SLICE_NAMES.PERMISSION_ALERT_SLICE,
  initialState,
  reducers: {
    showPermissionAlert: (state, action: PayloadAction<{ title: string; description: string }>) => {
      state.visible = true;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    hidePermissionAlert: (state) => {
      state.visible = false;
      state.title = '';
      state.description = '';
    },
  },
});

export const { showPermissionAlert, hidePermissionAlert } = permissionAlertSlice.actions;

export default permissionAlertSlice.reducer;

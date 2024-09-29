// src/store/alertshowPermissionpermissionAlertSlice.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PermissionAlertState {
  visible: boolean;
  modalVisible?: boolean;
  title?: string;
  description?: string;
}

const initialState: PermissionAlertState = {
  visible: false,
  modalVisible: false,
  title: '',
  description: '',
};

const permissionAlertSlice = createSlice({
  name: 'permissionAlertSlice',
  initialState,
  reducers: {
    showPermissionAlert: (state, action: PayloadAction<{ title: string; description: string }>) => {
      state.visible = true;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.modalVisible = false;
    },
    hidePermissionAlert: (state) => {
      state.visible = false;
      state.title = '';
      state.description = '';
      state.modalVisible = false;
    },
    showPermissionModal: (state) => {
      state.modalVisible = true;
    },
    hidePermissionModal: (state) => {
      state.modalVisible = false;
    },
  },
});

export const { showPermissionAlert, hidePermissionAlert, showPermissionModal, hidePermissionModal } =
  permissionAlertSlice.actions;

export default permissionAlertSlice.reducer;

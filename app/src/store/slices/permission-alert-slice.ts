// src/store/alertshowPermissionpermissionAlertSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface PermissionAlertState {
  modalVisible?: boolean;
}

const initialState: PermissionAlertState = {
  modalVisible: false,
};

const permissionAlertSlice = createSlice({
  name: 'permissionAlertSlice',
  initialState,
  reducers: {
    showPermissionModal: (state) => {
      state.modalVisible = true;
    },
    hidePermissionModal: (state) => {
      state.modalVisible = false;
    },
  },
});

export const { showPermissionModal, hidePermissionModal } = permissionAlertSlice.actions;

export default permissionAlertSlice.reducer;

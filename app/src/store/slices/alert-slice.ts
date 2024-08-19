// src/store/alertSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
interface AlertState {
  visible: boolean;
  sessionTimeout: boolean;
}

const initialState: AlertState = {
  visible: false,
  sessionTimeout: false,
};

const alertSlice = createSlice({
  name: SLICE_NAMES.ALERT_SLICE,
  initialState,
  reducers: {
    showAlert: (state) => {
      state.visible = true;
    },
    hideAlert: (state) => {
      state.visible = false;
    },
    showSessionTimeoutAlert: (state) => {
      state.sessionTimeout = true;
    },
    hideSessionTimeoutAlert: (state) => {
      state.sessionTimeout = false;
    },
  },
});

export const { showAlert, hideAlert, showSessionTimeoutAlert, hideSessionTimeoutAlert } = alertSlice.actions;

export default alertSlice.reducer;

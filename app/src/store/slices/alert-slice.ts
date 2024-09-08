// src/store/alertSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface AlertState {
  visible: boolean;
  sessionTimeout: boolean;
  serviceCallError: string;
}

const initialState: AlertState = {
  visible: false,
  sessionTimeout: false,
  serviceCallError: '',
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
    showServiceCallErrorToast: (state, action: PayloadAction<string>) => {
      state.serviceCallError = action.payload;
    },
  },
});

export const { showAlert, hideAlert, showSessionTimeoutAlert, hideSessionTimeoutAlert, showServiceCallErrorToast } =
  alertSlice.actions;

export default alertSlice.reducer;

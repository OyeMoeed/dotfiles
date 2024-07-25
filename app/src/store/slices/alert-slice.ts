// src/store/alertSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
interface AlertState {
  visible: boolean;
}

const initialState: AlertState = {
  visible: false,
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
  },
});


export const { showAlert, hideAlert } = alertSlice.actions;


export default alertSlice.reducer;

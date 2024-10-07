// src/store/idleTimer.ts
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

export interface idleTimerInterface {
  isSessionTimeout: boolean;
  sessionTime: string;
  reset: boolean;
}

const initialState: idleTimerInterface = {
  isSessionTimeout: false,
  sessionTime: '5', // Time per minutes
  reset: false,
};

const idleTimerSlice = createSlice({
  name: SLICE_NAMES.IDLE_TIMER,
  initialState,
  reducers: {
    showIdleTimerBottomSheet: (state) => {
      state.isSessionTimeout = true;
    },
    hideIdleTimerBottomSheet: (state) => {
      state.isSessionTimeout = false;
    },
    editSessionTime: (state, action) => {
      state.sessionTime = action.payload;
    },
    restartSessionTimer: (state, action) => {
      state.reset = action.payload;
    },
  },
});

export const { restartSessionTimer, editSessionTime, showIdleTimerBottomSheet, hideIdleTimerBottomSheet } =
  idleTimerSlice.actions;

export default idleTimerSlice.reducer;

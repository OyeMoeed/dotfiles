// src/store/idleTimer.ts
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

export interface idleTimerInterface {
  visible: boolean;
  timer: string;
  reset: boolean;
}

const initialState: idleTimerInterface = {
  visible: false,
  timer: '5',
  reset: false,
};

const idleTimerSlice = createSlice({
  name: SLICE_NAMES.IDLE_TIMER,
  initialState,
  reducers: {
    showIdleTimerBottomSheet: (state) => {
      state.visible = true;
    },
    hideIdleTimerBottomSheet: (state) => {
      state.visible = false;
    },
    editTimer: (state, action) => {
      state.timer = action.payload;
    },
    startTimer: (state, action) => {
      state.reset = action.payload;
    },
  },
});

export const { startTimer, editTimer, showIdleTimerBottomSheet, hideIdleTimerBottomSheet } = idleTimerSlice.actions;

export default idleTimerSlice.reducer;

// src/store/disabledModules.ts
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

export interface DisabledModulesInterface {
  icon?: string;
  title?: string;
  visible?: boolean;
  isEnabled?: boolean;
}

const initialState: DisabledModulesInterface = {
  visible: false,
  title: '',
  icon: '',
  isEnabled: false,
};

const disabledModulesSlice = createSlice({
  name: SLICE_NAMES.DISABLED_MODULES,
  initialState,
  reducers: {
    showDisabledModules: (state, action) => {
      state.visible = true;
      state.title = action.payload?.title;
      state.icon = action.payload?.icon;
    },
    hideDisabledModules: (state) => {
      state.visible = initialState?.visible;
      state.title = initialState?.title;
      state.icon = initialState?.icon;
    },
  },
});

export const { showDisabledModules, hideDisabledModules } = disabledModulesSlice.actions;

export default disabledModulesSlice.reducer;

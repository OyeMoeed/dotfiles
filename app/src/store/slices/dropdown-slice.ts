import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

export interface DropdownState {
  isDropdownVisible: boolean;
  data: any;
}

const initialState: DropdownState = {
  isDropdownVisible: false,
  data: null,
};

export const dropdownSlice = createSlice({
  name: SLICE_NAMES.DROPDOWN_SLICE,
  initialState,
  reducers: {
    showDropdownSheet: (state) => {
      state.isDropdownVisible = true;
    },
    hideDropdownSheet: (state) => {
      state.isDropdownVisible = false;
    },
    setdata: (state, action: PayloadAction<DropdownState>) => {
      state.data = action.payload;
    },
    loaddata: (state, action: PayloadAction<DropdownState>) => {
      state.data = action.payload;
    },
  },
});

export const { showDropdownSheet, hideDropdownSheet, setdata, loaddata } =
  dropdownSlice.actions;

export default dropdownSlice.reducer;

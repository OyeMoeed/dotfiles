import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

export interface ListItem {
  id: number;
  title: string;
}

export interface DropdownState {
  isDropdownVisible: boolean;
  data: ListItem[];
}

const initialState: DropdownState = {
  isDropdownVisible: false,
  data: [],
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
    setData: (state, action: PayloadAction<ListItem[]>) => {
      state.data = action.payload;
    },
    getSelectedType: (state, action: PayloadAction<ListItem[]>) => {
      state.data = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<ListItem[]>) => {
      state.data = action.payload;
    },
  },
});

export const { showDropdownSheet, hideDropdownSheet, setData, getSelectedType, setSelectedType } =
  dropdownSlice.actions;

export default dropdownSlice.reducer;

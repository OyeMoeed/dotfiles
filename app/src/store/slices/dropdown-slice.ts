import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

export interface ListItem {
  id: number;
  title: string;
}

export interface DropdownState {
  isDropdownVisible: boolean;
  data: ListItem[];
  filterType: string;
  selectedValue: string;
  heading: string;
}

const initialState: DropdownState = {
  isDropdownVisible: false,
  data: [],
  filterType: '',
  selectedValue: '',
  heading: '',
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
    getSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedValue = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedValue = action.payload;
    },
    getHeading: (state, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
    setHeading: (state, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
  },
});

export const {
  showDropdownSheet,
  hideDropdownSheet,
  setData,
  getSelectedType,
  setSelectedType,
  getHeading,
  setHeading,
} = dropdownSlice.actions;

export default dropdownSlice.reducer;

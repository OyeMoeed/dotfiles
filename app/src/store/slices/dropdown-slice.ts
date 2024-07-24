import { SNAP_POINTS } from '@app/constants/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
import { RootState } from '../store';

export interface ListItem {
  id: number;
  title: string;
}

export interface DropdownState {
  isDropdownVisible: boolean;
  data: ListItem[];
  filterType: string;
  selectedValues: Record<string, string>;
  heading: string;
  size: any;
  isSearchable: boolean;
}

const initialState: DropdownState = {
  isDropdownVisible: false,
  data: [],
  filterType: '',
  selectedValues: {},
  heading: '',
  size: SNAP_POINTS.MEDIUM,
  isSearchable: false,
};

const dropdownSlice = createSlice({
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
    setSelectedType: (state, action: PayloadAction<{ key: string; value: string }>) => {
      const { key, value } = action.payload;
      state.selectedValues[key] = value;
    },
    getSelectedType: (state, action: PayloadAction<string>) => {
      return state.selectedValues[action.payload] || '';
    },
    getHeading: (state, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
    setHeading: (state, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
    setSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.size = action.payload;
    },
    setSearchable: (state, action: PayloadAction<boolean>) => {
      state.isSearchable = action.payload;
    },
    getSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    getSearchable: (state, action: PayloadAction<boolean>) => {
      state.isSearchable = action.payload;
    },
  },
});

export const selectSelectedValue = (state: RootState, key: string) => {
  return state.dropdownReducer.selectedValues[key] || '';
};

export const {
  showDropdownSheet,
  hideDropdownSheet,
  setData,
  setSelectedType,
  getHeading,
  getSelectedType,
  setHeading,
} = dropdownSlice.actions;

export default dropdownSlice.reducer;

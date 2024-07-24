import { SNAP_POINTS } from '@app/constants/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
import { RootState } from '../store';
type SizeType = keyof typeof SNAP_POINTS;
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
  size: SizeType;
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
    initializeDropdown: (
      state,
      action: PayloadAction<{ data: ListItem[]; heading: string; isSearchable: boolean; size: SizeType }>,
    ) => {
      const { data, heading, isSearchable, size } = action.payload;
      state.data = data;
      state.heading = heading;
      state.isSearchable = isSearchable;
      state.size = size;
      state.isDropdownVisible = true;
    },
  },
});

export const selectSelectedValue = (state: RootState, key: string) => {
  return state.dropdownReducer.selectedValues[key] || '';
};

export const { initializeDropdown, hideDropdownSheet, setData, setSelectedType } = dropdownSlice.actions;

export default dropdownSlice.reducer;

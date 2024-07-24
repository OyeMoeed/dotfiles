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
    setHeading: (state, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
    setSize: (state, action: PayloadAction<SizeType>) => {
      state.size = action.payload;
    },
    setSearchable: (state, action: PayloadAction<boolean>) => {
      state.isSearchable = action.payload;
    },
  },
});

export const selectSelectedValue = (state: RootState, key: string) => {
  return state.dropdownReducer.selectedValues[key] || '';
};

export const { showDropdownSheet, hideDropdownSheet, setData, setSelectedType, setHeading, setSearchable, setSize } =
  dropdownSlice.actions;

export default dropdownSlice.reducer;

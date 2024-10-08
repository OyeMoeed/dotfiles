// actionSheetProps.ts

import { FiltersType } from '@app/utilities/enums.util';
import { FilterSelectedValue } from '@app/utilities';
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';

export interface IPayFilterProps {
  /**
   * props for showing heading text
   */

  ref: React.RefObject<bottomSheetTypes>;

  heading: string;
  /**
   * props for test id
   */
  testID?: string;
  /**
   * OnSubmit callback
   */
  onClearFilters?: () => void;

  onSubmit: (event: FilterSelectedValue) => void;
  onWatch?: (event: any, name: any, type: any) => void;
  onReset?: (event: boolean) => void;
  /**
   * prop for showing amount filter
   */
  showAmountFilter: boolean;
  /**
   * props for showing date filter
   */
  showDateFilter: boolean;

  filters: FilterTypes[];

  bottomFilters?: FilterTypes[] | undefined;

  isBottomDropdowns?: boolean;

  defaultValues: {
    [key in FiltersType]?: string;
  };
  isSearchShow?: boolean;
  applySearchOn?: string[];
  inputStyle?: StyleProp<ViewStyle>;
  doneText?: string;
  customFiltersValue?: boolean;
  handleCallback?: (sheetName: string) => void;
}

export enum CurrentViewTypes {
  FILTERS = 'filters',
  FILTER_VALUES = 'filter-values',
  BOTTOM_SHEET = 'bottom-sheet',
}

export interface FilterTypes {
  id: string;
  label: string;
  type: FiltersType;
  searchPlaceholder?: string;
  listTitleStyle?: object;
  dropdownIcon?: string;
  filterValues: FilterValueTypes[];
}

export interface FilterValueTypes {
  id: string;
  key: string;
  value: string;
  description?: string;
  displayValue?: string; // this will be utilized incase of contact number filter type
  heading?: string; // props for add custom heading.
}

export interface ControlFormField {
  // Represents the control instance managing field values in the form.
  control: Control<FieldValues>;
  // Identifier/key for this input field.
  name: string;
  // Textual label for this input field.
  label: string;
  // Icon element indicating checked state in lists
  listCheckIcon?: React.ReactElement<any> | undefined;
  // Callback function for clearing the input field.
  onClearInput?: () => void;
  // Indicates error state for the input field.
  isError?: boolean;
  // Error message associated with the input field.
  message?: string;
  required?: boolean;
  showFocusStyle?: boolean;
  suffix?: string;
}

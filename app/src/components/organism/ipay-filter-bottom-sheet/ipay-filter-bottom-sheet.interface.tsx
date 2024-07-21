// actionSheetProps.ts

import { FiltersType } from '@app/utilities/enums.util';
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';

export interface IPayFilterProps {
  /**
   * props for showing heading text
   */
  heading: string;
  /**
   * props for test id
   */
  testID?: string;
  /**
   * OnSubmit callback
   */
  onSubmit: (event: SubmitEvent) => void;
  /**
   * prop for showing amount filter
   */
  showAmountFilter: boolean;
  /**
   * props for showing date filter
   */
  showDateFilter: boolean;

  filters: FilterTypes[];

  defaultValues: {
    [key in FiltersType]?: string;
  };
  isSearchShow?: boolean;
  applySearchOn?: string[];
}

export enum CurrentViewTypes {
  FILTERS = 'filters',
  FILTER_VALUES = 'filter-values',
}

export interface FilterTypes {
  id: string;
  label: string;
  type: FiltersType;
  filterValues: FilterValueTypes[];
}

export interface FilterValueTypes {
  id: string;
  key: string;
  value: string;
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
}

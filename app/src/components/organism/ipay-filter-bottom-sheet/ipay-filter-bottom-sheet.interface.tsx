// actionSheetProps.ts

import { FiltersType } from '@app/utilities/enums.util';

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

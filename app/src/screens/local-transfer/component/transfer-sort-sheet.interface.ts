import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { Ref } from 'react';

/**
 * Properties for the TransferSortSheet component.
 */
export interface TransferSortSheetProps {
  /**
   * Updates sort order boolean state.
   */
  setSortBy: (sort: boolean) => void;
  /**
   * Current sort order boolean flag.
   */
  sortBy: boolean;
  /**
   * Reference to bottom sheet component.
   */
  sortSheetRef: Ref<bottomSheetTypes>;
}

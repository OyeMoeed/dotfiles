import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { Ref } from 'react';

/**
 * Properties for the LocalTransferSortSheet component.
 */
export interface LocalTransferSortSheetProps {
  /**
   * Updates sort order boolean state.
   */
  setSortBy: (sort: boolean) => void;
  /**
   * Ascending and Descending order boolean flag.
   */
  sortBy: boolean;
  /**
   * Reference to bottom sheet component.
   */
  sortSheetRef: Ref<bottomSheetTypes>;
}

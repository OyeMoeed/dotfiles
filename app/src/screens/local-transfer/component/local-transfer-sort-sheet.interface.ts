import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { Ref } from 'react';

/**
 * Properties for the LocalTransferSortSheet component.
 */
export interface LocalTransferSortSheetProps {
  /**
   * Updates sort order string value.
   */
  setSortBy: (sort: string) => void;
  /**
   * Ascending and Descending order value.
   */
  sortBy: string;
  /**
   * Reference to bottom sheet component.
   */
  sortSheetRef: Ref<bottomSheetTypes>;
}

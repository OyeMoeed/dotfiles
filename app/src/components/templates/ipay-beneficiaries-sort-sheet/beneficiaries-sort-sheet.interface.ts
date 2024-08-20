import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { Ref } from 'react';

/**
 * Properties for the BeneficiariesSortSheetProps component.
 */
export interface BeneficiariesSortSheetProps {
  /**
   * Updates sort order boolean state.
   */
  setSortByActive: (isActive: boolean) => void;
  /**
   * Current sort order boolean flag.
   */
  sortByActive: boolean;
  /**
   * Reference to bottom sheet component.
   */
  sortSheetRef: Ref<bottomSheetTypes>;
}

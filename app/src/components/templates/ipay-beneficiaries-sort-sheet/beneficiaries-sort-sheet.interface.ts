import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { Ref } from 'react';

/**
 * Properties for the BeneficiariesSortSheetProps component.
 */
export interface BeneficiariesSortSheetProps {
  /**
   * Updates sort order string state.
   */
  setSortByActive: (isActive: string) => void;
  /**
   * Current sort order string flag.
   */
  sortByActive: string;
  /**
   * Reference to bottom sheet component.
   */
  sortSheetRef: Ref<bottomSheetTypes>;
  /**
   * is Local Transfer to customize logic.
   */
  isLocalTransfer?: boolean;
}

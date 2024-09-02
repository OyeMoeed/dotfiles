// actionSheetProps.ts

import { OfferItem } from '@app/network/services/core/offers/offers.interface';

export interface IPayLatestSectionProps {
  testID?: string;

  transactionsData: object[] | null;
  offersData: OfferItem[];
  /**
   * User Rearrange Function
   */
  openBottomSheet?: () => void;

  /**
   * User Profile Function
   */
  openProfileBottomSheet?: () => void;
}

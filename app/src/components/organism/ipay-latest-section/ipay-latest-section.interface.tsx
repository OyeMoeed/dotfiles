// actionSheetProps.ts

import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { OfferItem } from '@app/network/services/core/offers/offers.interface';

export interface IPayLatestSectionProps {
  testID?: string;

  transactionsData: any[] | null;
  offersData: OfferItem[];
  /**
   * User Rearrange Function
   */
  openBottomSheet?: () => void;

  /**
   * User Profile Function
   */
  openProfileBottomSheet?: () => void;

  cards: CardInterface[];
  isLoading: boolean;
}

// ipay-card-flatlist.interface.ts

import { CardType } from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.interface';
import { CardDetailsSegment, CardOptions } from '@app/utilities/enums.util';

export interface IPayCardFlatListProps {
  testID?: string;
  selectedCardType: CardType;
  segmentType: CardDetailsSegment | string;
  cardOption: CardOptions;
}

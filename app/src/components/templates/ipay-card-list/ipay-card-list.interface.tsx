// ipay-card-.interface.ts

import { CardType } from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.interface';
import { CardDetailsSegment, CardOptions } from '@app/utilities/enums.util';

export interface IPayCardListProps {
  testID?: string;
  selectedCardType: CardType;
  segmentType: CardDetailsSegment | string;
  cardOption: CardOptions;
}

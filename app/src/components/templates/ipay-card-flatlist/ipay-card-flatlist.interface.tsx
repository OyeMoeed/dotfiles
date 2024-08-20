// ipay-card-flatlist.interface.ts

import { CardDetailsSegment, CardOptions, CardTypes } from '@app/utilities/enums.util';

export interface IPayCardFlatListProps {
  testID?: string;
  selectedCardType: CardTypes;
  segmentType: CardDetailsSegment | string;
  cardOption: CardOptions;
}

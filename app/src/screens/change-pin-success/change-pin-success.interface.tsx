import { CardTypes } from '@app/utilities/enums.util';

export interface RouteParams {
  currentCard: {
    cardType: CardTypes;
    cardHeaderText: string;
    name: string;
    maskedCardNumber: string;
  };
}

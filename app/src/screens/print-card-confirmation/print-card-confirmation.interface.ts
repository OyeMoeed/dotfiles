import { CardTypes } from '@app/utilities/enums.util';

export interface OTPVerificationRefTypes {
  close: () => void;
  resetInterval: () => void;
}

export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface RouteParams {
  currentCard: {
    cardType: CardTypes;
    cardHeaderText: string;
    name: string;
  };
}

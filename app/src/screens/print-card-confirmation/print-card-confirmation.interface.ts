import { CardTypes } from '@app/utilities/enums.util';

export interface OTPVerificationRefTypes {
  close: () => void;
  resetInterval: () => void;
}

export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface AddressInfoRefTypes {
  showAddressInfoSheet: () => void;
}

export interface RouteParams {
  currentCard: {
    cardType: CardTypes;
    cardHeaderText: string;
    name: string;
    cardIndex?: string;
  };
}

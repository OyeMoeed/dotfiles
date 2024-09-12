import { CardTypes } from '@app/utilities/enums.util';

export interface OTPVerificationRefTypes {
  close: () => void;
  resetInterval: () => void;
}

export interface RouteParams {
  currentCard: {
    cardType: CardTypes;
    cardHeaderText: string;
    name: string;
  };
}

export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface ChangePinRefTypes {
  resetInterval: () => void;
}

export interface AddressInfoRefTypes {
  showAddressInfoSheet: () => void;
}

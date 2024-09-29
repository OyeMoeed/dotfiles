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

  issuanceDetails: {
    address: string;
    replaceFee: string;
    shippingFee: string;
    totalFee: string;
    balance: string;
  };
}

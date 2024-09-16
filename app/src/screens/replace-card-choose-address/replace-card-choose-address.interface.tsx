import { CardTypes } from '@app/utilities/enums.util';

export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface ReplaceCardChooseCityListComponentProps {
  CITIES: string[];
  selectedCity: string;
  setSelectedCity: Function;
  onCloseBottomSheet: Function;
}

export interface RouteParams {
  currentCard: {
    cardType: CardTypes;
    cardHeaderText: string;
    name: string;
    maskedCardNumber: string;
  };
}

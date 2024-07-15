export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface ReplaceCardChooseCityListComponentProps {
  CITIES: string[];
  selectedCity: string;
  setSelectedCity: Function;
  onCloseBottomSheet: Function;
}

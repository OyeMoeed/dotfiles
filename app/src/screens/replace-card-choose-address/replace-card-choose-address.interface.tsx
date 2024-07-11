export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface OpenBottomSheetRefTypes {
  close: () => void;
  present: () => void;
}

export interface ReplaceCardChooseCityListComponentProps {
  CITIES: string[];
  selectedCity: string;
  setSelectedCity: Function;
  onCloseBottomSheet: Function;
}

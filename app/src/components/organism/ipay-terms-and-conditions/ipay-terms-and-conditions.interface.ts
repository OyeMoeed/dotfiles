export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface IPayTermsAndConditionsProps {
  showTermsAndConditions: boolean;
  setShowTermsAndConditions: (show: boolean) => void;
  termsAndConditionsURL?: string;
  isVirtualCardTermsAndConditions?: boolean;
}

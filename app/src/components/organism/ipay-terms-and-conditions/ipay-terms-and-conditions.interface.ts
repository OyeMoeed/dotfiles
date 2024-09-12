export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface IPayTermsAndConditionsProps {
  showTermsAndConditions: boolean;
  termsAndConditionsURL?: string;
  isVirtualCardTermsAndConditions?: boolean;
}

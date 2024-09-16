export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface IPayTermsAndConditionsProps {
  showTermsAndConditions: boolean;
  termsAndConditionsURL?: string | null;
  isVirtualCardTermsAndConditions?: boolean;
  isNafathTerms?: boolean;
}

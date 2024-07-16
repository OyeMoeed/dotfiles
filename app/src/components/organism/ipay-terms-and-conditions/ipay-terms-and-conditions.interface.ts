import { Ref } from 'react';

export interface TermsAndConditionsRefTypes {
  showTermsAndConditions: () => void;
}

export interface IPayTermsAndConditionsProps {
  ref?: Ref<TermsAndConditionsRefTypes>;
}

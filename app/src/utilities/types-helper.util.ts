/**
 * Represents the type of localization settings.
 */
export type localizationType = {
  /**
   * The selected language for localization.
   */
  language: string;
};

export interface bottomSheetTypes {
  close: () => void;
  present: () => void;
  dismiss: () => void;
  snapToIndex: () => void;
  snapToPosition: () => void;
  expand: () => void;
  collapse: () => void;
  forceClose: () => void;
  showFilters: () => void;
  show: () => void;
  hide: () => void;
  showTermsAndConditions: () => void;
  resetInterval: () => void;
  triggerToast: (text: string, hide?: boolean) => void;
}

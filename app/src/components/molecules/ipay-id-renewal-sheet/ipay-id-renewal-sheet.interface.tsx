/**
 * Props for the RNText component.
 */
export interface IPayIdRenewalSheetProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string | object;
  /**
   * function on Press the button.
   */
  confirm: () => {};
  /**
   * function on CLOSE Press the button.
   */
  onClose: () => {};
  /**
   * boolean to show alert on Press the button.
   */
  visible: boolean;
  aboutToExpireInfo?: IAboutToExpireInfo;
}

export interface IAboutToExpireInfo {
  isAboutToExpire: boolean;
  remaningNumberOfDaysToExpire: number;
  expiryDate: string;
}

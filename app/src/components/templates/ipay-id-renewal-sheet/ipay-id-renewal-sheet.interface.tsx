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
  confirm: () => void;
  /**
   * function on CLOSE Press the button.
   */
  onClose: () => void;
  /**
   * boolean to show alert on Press the button.
   */
  visible: boolean;
}

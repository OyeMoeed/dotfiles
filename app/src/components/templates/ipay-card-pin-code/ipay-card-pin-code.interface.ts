interface IPayCardPinCodeProps {
  /**
   * A testID for the element used for testing purposes.
   */
  testID?: string;
  /**
   * A method to call on verify
   */
  onVerifyPin: () => void;
  /**
   * A method to render toast
   */
  renderErrorToast: () => void;
  /**
   * a pin code to verify
   */
  pinCode: string;
}

export default IPayCardPinCodeProps;

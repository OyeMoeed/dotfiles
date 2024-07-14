interface IPayCardPinCodeProps {
  /**
   * A testID for the element used for testing purposes.
   */
  testID?: string;
  /**
   * A method to call on enter
   */
  onEnterPassCode: (arg: string) => void;
  /**
   * to display error indicator
   */
  passcodeError: boolean;
}

export default IPayCardPinCodeProps;

interface IPayLimitExceedProps {
  /**
   * Optional test ID for the component, used for testing purposes.
   */
  testID?: string;

  /**
   * Optional function to handle the continue action.
   * This function is called when the user decides to continue.
   */
  handleContinue?: () => void;

  /**
   * Optional amount that can be a number or a string.
   * Represents the amount related to the pay limit exceed.
   */
  amount?: number | string;

  /**
   * Optional function to handle the close action.
   * This function is called when the user decides to close the component.
   */
  close?: () => void;

  /**
   * Optional date representing the date related to the pay limit exceed.
   */
  date?: Date;
}
export default IPayLimitExceedProps;

/**
 * Props for the RNTextInput component.
 */
export interface IPayCalendarProps {
  /**
   * Callback function called when the "submit" button is pressed on the keyboard.
   * @param {date} date = provider a date
   */
  onDateSelected: (date: string) => void;
}

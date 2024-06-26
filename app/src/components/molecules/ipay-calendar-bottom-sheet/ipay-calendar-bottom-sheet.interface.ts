/**
 * Props for the RNTextInput component.
 */
export interface IPayCalendarBottomSheetProps {
  /**
   * Callback function called when the "submit" button is pressed on the keyboard.
   * @param {date} date = provider a date
   */
  onDateSelected: (date: string) => void;

  /**
   * heading for the bottom sheet
   */

  heading?: string;
}

export interface IPayCalendarBottomSheetHandle {
  present: () => void;
  close: () => void;
}

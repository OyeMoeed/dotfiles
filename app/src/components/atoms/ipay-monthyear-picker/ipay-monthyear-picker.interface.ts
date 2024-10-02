import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the RNTextInput component.
 */
export interface IPayMonthYearPickerProps {
  /**
   * testID for the date picker to test the element.
   */
  testID?: string;

  /**
   * Android Style for the date picker
   */
  androidStyle?: StyleProp<ViewStyle>;

  /**
   * Style for the date picker
   */

  style?: StyleProp<ViewStyle>;

  /**
   * Callback function called when the "submit" button is pressed on the keyboard.
   * @param {date} date = new Date
   */
  onDateChange?: (date: string) => void;

  /**
   * value for the date picker to test the element.
   */
  value?: Date;

  display?: string;

  mode?: string;
  withYear20?: boolean;
}

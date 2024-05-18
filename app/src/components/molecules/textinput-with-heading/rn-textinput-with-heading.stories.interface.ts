import { TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNTextInputWithHeading component.
 */
export interface RNTextInputWithHeadingProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * The heading text to be displayed above the input field.
   */
  heading: string;
  /**
   * Style for the container of the component.
   */
  containerStyle?: ViewStyle;
  /**
   * Style for the heading text.
   */
  headingStyles?: TextStyle;
  /**
   * Style for the input text.
   */
  inputTextStyles?: TextStyle;
  /**
   * Callback function to be executed when the text in the input field changes.
   * @param {string} text - The new text entered in the input field.
   */
  onChangeTextCallback?: (text: string) => void;
}

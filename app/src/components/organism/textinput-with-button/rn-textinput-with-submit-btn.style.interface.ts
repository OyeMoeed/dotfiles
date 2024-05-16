import { TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNTextInputWithSubmitBtn component.
 */
export interface RNTextInputWithSubmitBtnProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * The heading text for the input field.
   */
  inputTextHeading: string;
  /**
   * Callback function called when the submit button is pressed.
   * @param {string} text - The text entered in the input field.
   */
  onPressBtn: (text: string) => void;
  /**
   * Style for the container of the component.
   */
  containerStyles?: ViewStyle | undefined;
  /**
   * Style for the container of the input field.
   */
  inputTextContainerStyles?: ViewStyle;
  /**
   * Style for the heading text of the input field.
   */
  inputTextHeadingStyles?: TextStyle;
  /**
   * Style for the input text.
   */
  inputTextStyles?: TextStyle;
  /**
   * Style for the submit button.
   */
  btnStyle?: ViewStyle;
  /**
   * Style for the text of the submit button.
   */
  btnTextStyles?: TextStyle;
}

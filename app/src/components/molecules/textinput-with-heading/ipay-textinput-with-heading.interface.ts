import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNTextInputWithHeading component.
 */
export interface IPayTextInputWithHeadingProps {
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
  containerStyle: StyleProp<ViewStyle>;
  /**
   * Style for the heading text.
   */
  headingStyles: StyleProp<TextStyle>;
  /**
   * Style for the input text.
   */
  inputTextStyles: StyleProp<TextStyle>;
  /**
   * Callback function to be executed when the text in the input field changes.
   * @param {string} text - The new text entered in the input field.
   */
  onChangeTextCallback?: (text: string) => void;
}
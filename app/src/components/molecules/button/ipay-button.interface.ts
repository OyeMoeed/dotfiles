import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNButton component.
 */
export interface IPayButtonProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * Callback function to be executed when the button is pressed.
   */
  onPress: () => void;
  /**
   * Text to be displayed on the button.
   */
  btnText?: string;
  /**
   * Style for the button container.
   */
  btnStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the text inside the button.
   */
  textStyle?: TextStyle;
  /**
   * children for button.
   */
  children?: JSX.Element;
}

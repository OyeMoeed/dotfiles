import { StyleProp, TextStyle } from 'react-native';

/**
 * Props for the RNTitle1Text component.
 */
export interface IPayTitle1TextProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * The text content to be displayed.
   */
  text?: string;
  /**
   * Regular font family for the text.
   */
  regular?: boolean;

  /**
   * Style for the text.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Maximum number of lines to show. If undefined, all lines will be shown.
   */
  numberOfLines?: number;
  /**
   * Children components to be rendered inside the RNText.
   */
  children?: React.ReactNode;
}

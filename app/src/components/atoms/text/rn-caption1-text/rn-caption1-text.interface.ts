import { TextStyle } from 'react-native';

/**
 * Props for the RNCaption1Text component.
 */
export interface RNCaption1TextProps {
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
  style?: TextStyle | ({} | undefined)[];
  /**
   * Maximum number of lines to show. If undefined, all lines will be shown.
   */
  numberOfLines?: number;
  /**
   * Children components to be rendered inside the RNText.
   */
  children?: React.ReactNode;
}

import { TextStyle } from 'react-native';

/**
 * Props for the RNText component.
 */
export interface RNTextProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * The text content to be displayed.
   */
  text?: string;
  /**
   * Font family for the text.
   */
  fontFamily?: string | number;
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

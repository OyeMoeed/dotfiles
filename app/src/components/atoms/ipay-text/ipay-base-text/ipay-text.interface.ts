import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

/**
 * Props for the RNText component.
 */
export interface IPayTextProps {
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
  style?: StyleProp<TextStyle>;
  /**
   * Maximum number of lines to show. If undefined, all lines will be shown.
   */
  numberOfLines?: number;
  /**
   * Varient for text color.
   */
  varient?: string;
  /**
   * Children components to be rendered inside the RNText.
   */
  children?: React.ReactNode;

  /**
   * amount format for the text.
   */

  isAmount?: boolean;

  fontWeight?: string;
  /**
   * Need translate the text.
   */
  shouldTranslate?: boolean;
}

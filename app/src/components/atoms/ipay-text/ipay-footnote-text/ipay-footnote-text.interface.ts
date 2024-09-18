import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

/**
 * Props for the RNFootnoteText component.
 */
export interface IPayFootnoteTextProps {
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
   * Children components to be rendered inside the IPayText.
   */
  children?: React.ReactNode;
  /**
   * Text Color.
   */
  color?: string;
  fontWeight?: string;
  /**
   * Need translate the text.
   */
  shouldTranslate?: boolean;
}

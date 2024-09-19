import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

/**
 * Props for the RNSubHeadlineText component.
 */
export interface IPaySubHeadlineTextProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * The text content to be displayed.
   */
  text?: string | null;
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
   * Color for the text.
   */
  color?: string;
  /**
   * Need translate the text.
   */
  shouldTranslate?: boolean;
}

import React, { JSX } from 'react';
import { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the RNScrollView component.
 */
export interface IPayScrollViewProps extends ScrollViewProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * The children components to be rendered inside the ScrollView.
   */
  children?: JSX.Element | JSX.Element[];
  /**
   * Style for the ScrollView container.
   */
  style?: StyleProp<ViewStyle | ScrollViewProps>;
  /**
   * If true, the ScrollView scrolls horizontally instead of vertically.
   */
  horizontal?: boolean;
  /**
   * Custom refresh control element.
   */
  refreshControl?: React.ReactElement;
  /**
   * If returns the gesture handler scrollview.
   * this fixed scrolling inside gesture handler
   */
  isGHScrollView?: boolean;
  showsVerticalScrollIndicator?: boolean;
}

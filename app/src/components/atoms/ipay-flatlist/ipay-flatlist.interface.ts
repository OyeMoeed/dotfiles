import React from 'react';
import { FlatListProps, StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the RNFlatlist component.
 */
export interface IPayFlatlistProps extends FlatListProps<any> {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * Style for the container of the flatlist.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom refresh control element.
   */
  refreshControl?: React.ReactElement;
  /**
   * If true, renders the flatlist horizontally.
   */
  horizontal?: boolean;
  itemSeparatorStyle?: StyleProp<ViewStyle>;

  /**
   * If true, renders the gesture handler flatlist.
   * this fixed nested scroll not working issue inside flatlist
   */
  isGHFlatlist?: boolean;
}

import { FlatListProps, ViewStyle } from 'react-native';

/**
 * Props for the RNFlatlist component.
 */
export interface RNFlatlistProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * Style for the container of the flatlist.
   */
  style?: ViewStyle;
  /**
   * Function to render each item of the flatlist.
   * @param {T} item - The item to render.
   * @returns {React.ReactElement<any>} - The rendered element for the item.
   */
  renderItem: (item: T) => React.ReactElement<any>;
  /**
   * Custom refresh control element.
   */
  refreshControl?: React.ReactElement;
  /**
   * If true, renders the flatlist horizontally.
   */
  horizontal?: boolean;
}

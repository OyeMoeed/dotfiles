import React from 'react';
import { FlatList } from 'react-native';
import { RNFlatlistProps } from './rn-flatlist.interface';
import styles from './rn-flatlist.style';

/**
 * A customizable flatlist component.
 * @returns {JSX.Element} - The rendered component.
 * @template T - The type of data items in the flatlist.
 */
const RNFlatlist = ({
  testID,
  style,
  data,
  renderItem,
  refreshControl,
  horizontal,
  ...rest
}: RNFlatlistProps): JSX.Element => {
  return (
    <FlatList
      testID={testID}
      style={[styles.mainContainer, style]}
      data={data}
      renderItem={renderItem} // Pass the item to the renderItem function
      keyExtractor={(item, index) => index.toString()}
      refreshControl={refreshControl}
      horizontal={horizontal}
      {...rest} // Pass any additional props to FlatList
    />
  );
};

export default RNFlatlist;

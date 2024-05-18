import React from 'react';
import { FlatList } from 'react-native';
import styles from './rn-flatlist.style';
import { RNFlatlistProps } from './rn-flatlist.interface';

/**
 * A customizable flatlist component.
 * @param {RNFlatlistProps<T>} props - The props for the RNFlatlist component.
 * @returns {JSX.Element} - The rendered component.
 * @template T - The type of data items in the flatlist.
 */
const RNFlatlist = <T extends any>({
  testID,
  style,
  data,
  renderItem,
  refreshControl,
  horizontal,
  ...rest
}: RNFlatlistProps<T>): JSX.Element => {
  return (
    <FlatList
      testID={testID}
      style={[styles.mainContainer, style]}
      data={data}
      renderItem={({ item }) => renderItem(item)} // Pass the item to the renderItem function
      keyExtractor={(item, index) => index.toString()}
      refreshControl={refreshControl}
      horizontal={horizontal}
      {...rest} // Pass any additional props to FlatList
    />
  );
};

export default RNFlatlist;

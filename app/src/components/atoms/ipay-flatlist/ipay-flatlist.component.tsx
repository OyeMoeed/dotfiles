import React from 'react';
import { FlatList } from 'react-native';

import { IPayItemSeparator } from '@components/atoms/index';
import { IPayFlatlistProps } from './ipay-flatlist.interface';
import styles from './ipay-flatlist.style';

/**
 * A customizable flatlist component.
 * @returns {JSX.Element} - The rendered component.
 * @template T - The type of data items in the flatlist.
 */
const IPayFlatlist: React.FC<IPayFlatlistProps> = ({
  testID,
  style,
  data,
  renderItem,
  refreshControl,
  horizontal,
  itemSeparatorStyle,
  ...rest
}: IPayFlatlistProps) => {
  return (
    <FlatList
      testID={`${testID}-flatlist`}
      style={[styles.mainContainer, style]}
      data={data}
      renderItem={renderItem} // Pass the item to the renderItem function
      ItemSeparatorComponent={() => <IPayItemSeparator itemSeparatorStyle={itemSeparatorStyle} />}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={refreshControl}
      horizontal={horizontal}
      {...rest} // Pass any additional props to FlatList
    />
  );
};

export default IPayFlatlist;

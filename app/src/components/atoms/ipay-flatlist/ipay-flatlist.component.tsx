import { IPayItemSeparator } from '@components/atoms/index';
import { forwardRef, useCallback } from 'react';
import { FlatList } from 'react-native';
import { FlatList as GHFlatList } from 'react-native-gesture-handler';
import { IPayFlatlistProps } from './ipay-flatlist.interface';
import styles from './ipay-flatlist.style';

/**
 * A customizable flatlist component.
 * @returns {JSX.Element} - The rendered component.
 * @template T - The type of data items in the flatlist.
 */
const IPayFlatlist = forwardRef<FlatList, IPayFlatlistProps>(
  ({ testID, style, data, renderItem, refreshControl, horizontal, itemSeparatorStyle, isGHFlatlist, ...rest }, ref) => {
    const itemSeparator = useCallback(
      () => <IPayItemSeparator itemSeparatorStyle={itemSeparatorStyle} />,
      [itemSeparatorStyle],
    );
    if (isGHFlatlist) {
      return (
        <GHFlatList
          testID={`${testID}-GHFlatlist`}
          style={[styles.mainContainer, style]}
          data={data}
          renderItem={renderItem} // Pass the item to the renderItem function
          ItemSeparatorComponent={() => itemSeparator()}
          refreshControl={refreshControl}
          keyExtractor={(_, index) => index.toString()}
          horizontal={horizontal}
          {...rest} // Pass any additional props to FlatList
        />
      );
    }
    return (
      <FlatList
        testID={`${testID}-flatlist`}
        style={[styles.mainContainer, style]}
        data={data}
        ref={ref}
        renderItem={renderItem} // Pass the item to the renderItem function
        ItemSeparatorComponent={() => itemSeparator()}
        refreshControl={refreshControl}
        keyExtractor={(_, index) => index.toString()}
        horizontal={horizontal}
        {...rest} // Pass any additional props to FlatList
      />
    );
  },
);

export default IPayFlatlist;

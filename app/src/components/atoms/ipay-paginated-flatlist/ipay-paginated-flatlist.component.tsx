import useTheme from '@app/styles/hooks/theme.hook';
import { IPayFootnoteText, IPayItemSeparator, IPayView } from '@components/atoms/index';
import { useCallback } from 'react';
import { ActivityIndicator, FlatList as NativeFlatList } from 'react-native';
import { FlatList as GHFlatList } from 'react-native-gesture-handler';
import usePaginatedFetch from './ipay-paginated-flatlist.hook';
import { IPayPaginatedFlatListProps } from './ipay-paginated-flatlist.interface';
import styles from './ipay-paginated-flatlist.style';

const IPayPaginatedFlatList = <T,>({
  testID,
  fetchData,
  pageSize = 10,
  renderItem,
  keyExtractor,
  externalData,
  itemSeparatorStyle,
  isGHFlatlist = false,
  ...rest
}: IPayPaginatedFlatListProps<T>) => {
  const { data, loading, error, loadMoreData, refreshData, hasMore } = usePaginatedFetch<T>(
    fetchData,
    pageSize,
    externalData,
  );
  const { colors } = useTheme();

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <IPayView style={styles.footer}>
        <ActivityIndicator size="large" />
      </IPayView>
    );
  };

  const itemSeparator = useCallback(
    () => <IPayItemSeparator itemSeparatorStyle={itemSeparatorStyle} />,
    [itemSeparatorStyle],
  );

  if (error) {
    return (
      <IPayView style={styles.errorMessage}>
        <IPayFootnoteText text={error.message} color={colors.error.error500} />
      </IPayView>
    );
  }

  if (isGHFlatlist) {
    return (
      <GHFlatList
        testID={`${testID}-paginated-GHFlatlist`}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={itemSeparator}
        refreshing={loading && !hasMore}
        onRefresh={refreshData}
        {...rest}
      />
    );
  }

  return (
    <NativeFlatList
      testID={`${testID}-paginated-flatlist`}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ItemSeparatorComponent={itemSeparator}
      refreshing={loading && !hasMore}
      onRefresh={refreshData}
      {...rest}
    />
  );
};

export default IPayPaginatedFlatList;

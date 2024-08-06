// src/components/IPayPaginatedFlatlist.tsx

import useTheme from '@app/styles/hooks/theme.hook';
import { IPayFlatlist, IPayFootnoteText, IPayView } from '@components/atoms/index'; // Adjust the import based on your project structure
import { ActivityIndicator } from 'react-native';
import usePaginatedFetch from './ipay-paginated-flatlist.hook';
import { IPayPaginatedFlatListProps } from './ipay-paginated-flatlist.interface';
import styles from './ipay-paginated-flatlist.style';

const IPayPaginatedFlatlist = <T,>({
  testID,
  fetchData,
  pageSize = 10,
  renderItem,
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

  if (error) {
    return (
      <IPayView style={styles.errorMessage}>
        <IPayFootnoteText text={error.message} color={colors.error.error500} />
      </IPayView>
    );
  }

  return (
    <IPayFlatlist
      testID={`${testID}-paginated-flatlist`}
      data={data}
      renderItem={renderItem}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshing={loading && !hasMore}
      onRefresh={refreshData}
      itemSeparatorStyle={itemSeparatorStyle}
      isGHFlatlist={isGHFlatlist}
      {...rest}
    />
  );
};

export default IPayPaginatedFlatlist;

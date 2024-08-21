import { FlatListProps, ListRenderItem, StyleProp, ViewStyle } from 'react-native';

export interface IPayPaginatedFlatListProps<T> extends Omit<FlatListProps<T>, 'data' | 'renderItem' | 'keyExtractor'> {
  fetchData: (page: number, pageSize: number) => Promise<{ data: T[]; hasMore: boolean }>;
  pageSize?: number;
  renderItem: ListRenderItem<T>;
  externalData?: T[];
  isGHFlatlist?: boolean;
  itemSeparatorStyle?: StyleProp<ViewStyle>;
}

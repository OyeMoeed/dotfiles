import { SelectedValue } from '@app/screens/add-new-sadad-bill/add-new-sadad-bill.interface';
import { StyleProp, ViewStyle } from 'react-native';

export interface ListProps {
  id?: number | string;
  text?: string;
}
export interface IPayListViewProps {
  testID?: string;
  list: ListProps[];
  selectedListItem?: string;
  onPressListItem: (item: SelectedValue) => void;
  cardStyles?: StyleProp<ViewStyle>;
  listStyles?: StyleProp<ViewStyle>;
  isCompleteItem?: boolean; // get whole object of item
}

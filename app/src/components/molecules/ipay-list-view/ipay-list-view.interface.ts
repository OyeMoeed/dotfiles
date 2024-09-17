import { StyleProp, ViewStyle } from 'react-native';

export interface ListProps {
  id?: number | string;
  text?: string;
}
export interface IPayListViewProps {
  testID?: string;
  list: ListProps[];
  selectedListItem?: string;
  onPressListItem: (text: string) => void;
  cardStyles?: StyleProp<ViewStyle>;
  listStyles?: StyleProp<ViewStyle>;
  isCompleteItem?: boolean; // get whole object of item
}

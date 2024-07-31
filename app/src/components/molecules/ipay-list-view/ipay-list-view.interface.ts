import { StyleProp, ViewStyle } from 'react-native';

interface ListProps {
  id?: number | string;
  text?: string;
}
export interface IPayListViewProps {
  testID?: string;
  list: ListProps[];
  selectedListItem?: string;
  onPressListItem: (text: string) => void;
  cardStyles?: StyleProp<ViewStyle>;
}

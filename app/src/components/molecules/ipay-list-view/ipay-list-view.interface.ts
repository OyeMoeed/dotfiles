interface ListProps {
  id?: number | string;
  text?: string;
}
export interface IPayListViewProps {
  testID?: string;
  list: ListProps[];
  selectedListItem?: string;
  onPressListItem: (text: string) => void;
  isCompleteItem?: boolean; // get whole object of item
}

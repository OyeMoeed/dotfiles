interface ListProps {
  id?: number | string;
  text?: string;
}
export interface IPayListViewProps {
  testID?: string;
  list: ListProps[];
  selectedListItem?: string;
  onPressListItem: (text: string) => void;
  isItem?: boolean;
  noRecordMessage?: string; // Message to show when no record
  noRecordIcon?: string; // Icon for no record
}

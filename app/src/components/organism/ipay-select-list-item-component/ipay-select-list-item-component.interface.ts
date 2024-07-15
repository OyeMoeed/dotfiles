import { ViewStyle } from 'react-native';

interface IPaySelectListItemComponentProps {
  testID?: string;
  style?: ViewStyle;
  data?: ListItem[];
  onSelectListItem: (item: string) => void;
}

// Define the type for each item item
interface ListItem {
  id: number;
  title: string;
}

// Props for the function component that renders item names
interface ListItemProps {
  [x: string]: string;
  item: ListItem;
}

// Interface for the Ref Object
interface IPaySelectListItemComponentRef {
  resetSelectedCity: () => void;
}

export { IPaySelectListItemComponentProps, IPaySelectListItemComponentRef, ListItem, ListItemProps };

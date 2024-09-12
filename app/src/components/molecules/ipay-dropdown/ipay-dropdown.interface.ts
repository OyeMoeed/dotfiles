import { ViewStyle } from 'react-native';

interface IPayDropdownComponentProps {
  testID?: string;
  style?: ViewStyle;
  list?: ListItem[];
  onSelectListItem: (item: ListItem) => void;
  searchText: string;
  setSearchText: Function;
  onSave: () => void;
  selectedItem?: ListItem;
}

// Define the type for each item item
interface ListItem {
  id: number | string;
  title: string;
}

// Interface for the Ref Object
interface IPayDropdownComponentRef {
  resetSelectedCity: () => void;
}

export { IPayDropdownComponentProps, IPayDropdownComponentRef, ListItem };

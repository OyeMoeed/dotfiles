import { ViewStyle } from 'react-native';

interface IPayDropdownComponentProps {
  testID?: string;
  style?: ViewStyle;
  list?: ListItem[];
  onSelectListItem: (item: string) => void;
  searchText: string;
  setSearchText: Function;
}

// Define the type for each item item
interface ListItem {
  id: number;
  title: string;
}

// Interface for the Ref Object
interface IPayDropdownComponentRef {
  resetSelectedCity: () => void;
}

export { IPayDropdownComponentProps, IPayDropdownComponentRef, ListItem };

import { ViewStyle } from 'react-native';

interface IPayDropdownComponentProps {
  testID?: string;
  style?: ViewStyle;
  data: ListItem[];
  onSelectListItem?: (item: string) => void;
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

import { ViewStyle } from 'react-native';

interface IPayDropdownComponentProps {
  dropdownType:string;
  label:string;
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
interface IPayDropdownComponentRef{

}


export { IPayDropdownComponentProps, IPayDropdownComponentRef, ListItem };


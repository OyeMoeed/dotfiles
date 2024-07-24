import { ViewStyle } from 'react-native';

interface IPayDropdownComponentProps {
  dropdownType: string;
  label: string;
  testID?: string;
  style?: ViewStyle;
  data: ListItem[];
  onSelectListItem?: (item: string) => void;
  value: string;
  setValue: (item: string) => void;
}

// Define the type for each item item
interface ListItem {
  id: number;
  title: string;
}
interface IPayDropdownComponentSheetProps {
  present?: () => void;
  close?: () => void;
}

export { IPayDropdownComponentProps, IPayDropdownComponentSheetProps, ListItem };

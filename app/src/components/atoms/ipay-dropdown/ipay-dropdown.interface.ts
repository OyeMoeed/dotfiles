import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface IPayDropdownComponentProps {
  // display header of dropdown sheet
  dropdownType: string;
  // display heading of input
  label: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  data: ListItem[];
  onSelectListItem?: (item: string) => void;
  // prop for searchable dropdown
  isSearchable?: boolean;
  size: string[];
  name: string;
  disabled?: boolean;
  showLeftIcon?: boolean;
  rightIcon?: ReactElement<any> | undefined;
}

interface ListItem {
  id: number;
  title: string;
}
interface IPayDropdownComponentSheetProps {
  present?: () => void;
  close?: () => void;
}

export { IPayDropdownComponentProps, IPayDropdownComponentSheetProps, ListItem };

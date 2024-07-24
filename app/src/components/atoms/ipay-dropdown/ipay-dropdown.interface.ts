import { SNAP_POINTS } from '@app/constants/constants';
import { StyleProp, ViewStyle } from 'react-native';
type SizeType = keyof typeof SNAP_POINTS;
interface IPayDropdownComponentProps {
  dropdownType: string;
  label: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  data: ListItem[];
  onSelectListItem?: (item: string) => void;
  value: string;
  setValue: (item: string) => void;
  isSearchable: boolean;
  size: SizeType;
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

import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native-size-matters';

export interface IPayDropdownSelectProps {
  // Display heading of input
  label: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  data: ListItem[];
  onSelectListItem?: (item: string) => void;
  // Prop for searchable dropdown
  isSearchable?: boolean;
  disabled?: boolean;
  // Which key should be used as label
  labelKey: string;
  // Which key should be used as value
  valueKey: string;
  // Selected value
  selectedValue?: any;
  errorMessage?: string;
}

export interface ListItem {
  [key: string]: any;
}

export interface IPayDropdownComponentSheetProps {
  data: ListItem[];
  isSearchable: boolean;
  onSelectItem: (item: ListItem) => void;
  selectedItem: string;
  heading: string;
  snapPoints: string[];
  valueKey: string;
  labelKey: string;
  isVisible: boolean;
  onCloseBottomSheet: () => void;
}

import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native-size-matters';

export interface IPayDropdownSelectProps {
  // Display heading of input
  label: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  data: ListItem[];
  onSelectListItem?: (item: string | ListItem) => void;
  // Prop for searchable dropdown
  isSearchable?: boolean;
  disabled?: boolean;
  // Which key should be used as label
  labelKey: keyof ListItem;
  // Which key should be used as value
  valueKey: keyof ListItem;
  // Selected value
  selectedValue?: any;
  errorMessage?: string;

  placeholder?: string;
  customIcon?: any;
  editable?: boolean;
  customSnapPoints?: any[];
  containerStyle?: any;
  rightIcon?: any;
  isCountry?: boolean;
  isCurrency?: boolean;
  returnFullValue?: boolean;
  value?: string | ListItem;
}

export interface ListItem {
  code?: string;
  desc?: string;
  title?: string;
  id?: string;
  otherValue?: string;
}

export interface IPayDropdownComponentSheetProps {
  testID?: string;
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
  isCountry?: boolean;
  isCurrency?: boolean;
}

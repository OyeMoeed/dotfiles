import { ViewStyle } from 'react-native';

export interface ipayDropdownViewProps {
  testID?: string;
  style?: ViewStyle;
  headingText: string;
  subHeadlinText?: string;
  onPressDropdown: () => void;
}

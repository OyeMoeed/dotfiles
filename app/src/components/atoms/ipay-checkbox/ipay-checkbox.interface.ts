import { ViewStyle } from 'react-native';

export interface IPayCheckboxProps {
  testID?: string;
  style?: ViewStyle;
  checkboxBackgroundColor?: string;
  onPress?: () => void;
  disabled?: boolean;
  isCheck?: boolean;
}

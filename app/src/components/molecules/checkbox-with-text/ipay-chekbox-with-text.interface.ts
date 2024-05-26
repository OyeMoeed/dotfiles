import { ViewStyle } from 'react-native';

export interface IPayCheckboxWithTextProps {
  testID?: string;
  checkBoxStyle?: ViewStyle;
  checkboxBackgroundColor?: string;
  onPress?: () => void;
  heading?: string;
  text?: string;
  isCheck?: boolean;
}
